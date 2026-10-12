/* HumanMap DB: a tiny in-browser "database" (no server needed).
   Data files call DB.bulk()/DB.insert() to fill tables; the app reads them with
   DB.all/get/where/search. Tables: places, stems, journey, peoples. See README.md. */
(function (g) {
  const T = {};
  const DB = {
    tables: T,
    insert(t, o) { (T[t] = T[t] || []).push(o); return o; },
    bulk(t, cols, rows, extra) { rows.forEach(r => { const o = Object.assign({}, extra); cols.forEach((c, i) => o[c] = r[i]); DB.insert(t, o); }); },
    all(t) { return T[t] || []; },
    get(t, id) { return DB.all(t).find(r => r.id === id); },
    where(t, f) { return DB.all(t).filter(f); },
    search(t, q, fields) { q = q.toLowerCase(); return DB.all(t).filter(r => fields.some(f => String(r[f] || '').toLowerCase().includes(q))); },

    /* "$STEM" macros in routes expand to the shared stem routes (see data/stems.js) */
    expand(s, depth) {
      if ((depth || 0) > 12) throw new Error('Stem loop in: ' + s);
      return s.replace(/\$(\w+)/g, (m, k) => { const st = DB.get('stems', k); if (!st) throw new Error('Unknown stem $' + k); return DB.expand(st.route, (depth || 0) + 1); });
    },
    /* 'Label|key@date>key@date' -> {l, pts:[{k,d}]} */
    parseRoute(s) {
      const e = DB.expand(s), i = e.indexOf('|');
      return { l: i < 0 ? '' : e.slice(0, i), pts: (i < 0 ? e : e.slice(i + 1)).split('>').map(p => { const [k, d] = p.split('@'); return { k, d: d || '' }; }) };
    },
    placeMap() { const m = {}; DB.all('places').forEach(p => m[p.id] = [p.lon, p.lat, p.name]); return m; },
    journeyTree() {
      const ALL = {}; let ROOT = null;
      DB.all('journey').forEach(r => { ALL[r.id] = { k: r.id, d: r.date, t: r.note, p: null, dp: 0, c: [] }; });
      DB.all('journey').forEach(r => { const n = ALL[r.id]; if (r.parent) { n.p = ALL[r.parent]; n.p.c.push(n); } else ROOT = n; });
      (function depth(n, d) { n.dp = d; n.c.forEach(c => depth(c, d + 1)); })(ROOT, 0);
      return { ALL, ROOT };
    },
    countries() {
      const by = {};
      DB.all('peoples').forEach(p => (by[p.country] = by[p.country] || []).push(p));
      return Object.keys(by).sort((a, b) => a.localeCompare(b)).map((n, ci) => ({
        n, region: by[n][0].region,
        g: by[n].map(p => ({ n: p.name, t: p.note, ci, r: p.routes.map(DB.parseRoute) }))
      }));
    },
    /* Returns a list of problems (empty list = healthy database) */
    validate() {
      const E = [], seen = {}, P = {};
      DB.all('places').forEach(p => { if (P[p.id]) E.push('duplicate place ' + p.id); P[p.id] = 1; if (!(p.lon >= -180 && p.lon <= 180 && p.lat >= -90 && p.lat <= 90)) E.push('bad coordinates for place ' + p.id); });
      const J = {}; let roots = 0;
      DB.all('journey').forEach(r => { if (J[r.id]) E.push('duplicate journey id ' + r.id); J[r.id] = 1; if (!P[r.id]) E.push('journey: unknown place ' + r.id); if (!r.parent) roots++; });
      DB.all('journey').forEach(r => { if (r.parent && !J[r.parent]) E.push('journey: ' + r.id + ' has unknown parent ' + r.parent); });
      DB.all('places').forEach(p => { if (!J[p.id]) E.push('place ' + p.id + ' (' + p.name + ') is not a Journey stop: add it to data/journey.js'); });
      DB.all('journey').forEach(r => { let c = r, n = 0; while (c && c.parent && n++ < 60) c = DB.get('journey', c.parent); if (n >= 60) E.push('journey: loop at ' + r.id); });
      if (roots !== 1) E.push('journey needs exactly one root, found ' + roots);
      DB.all('peoples').forEach(p => {
        const key = p.country + '/' + p.name; if (seen[key]) E.push('duplicate people ' + key); seen[key] = 1;
        if (!p.routes || !p.routes.length) E.push(key + ': no routes');
        (p.routes || []).forEach(s => { try { DB.parseRoute(s).pts.forEach(pt => { if (!P[pt.k]) E.push(key + ': unknown place ' + pt.k); if (!pt.d) E.push(key + ': missing date at ' + pt.k); }); } catch (e) { E.push(key + ': ' + e.message); } });
      });
      return E;
    }
  };
  g.DB = DB;
})(typeof window !== 'undefined' ? window : globalThis);
