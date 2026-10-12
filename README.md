# HMA · Human Migration Atlas

## The map
`map/map.svg` is loaded as an `<image>` by `js/map.js`, so it works from a plain double-click (no fetch).
The calibration that turns longitude/latitude into SVG coordinates lives in the `MAP` object at the top of
`js/map.js` and is also written in the comment at the top of `map.svg`. To use a different map, replace the
file, update `MAP` (canvas size, `x0`, `sx`, `c`, `R`, and the `home` box) and everything else follows.
Change the coastline colour by editing `fill` in `map.svg`; ocean and grid colours are in `css/style.css` and `index.html`.

## Adding data
1. **New place** — add a row to `data/places.js`: `['id', lon, lat, 'Name']` **and** a stop in `data/journey.js` (every place must be reachable in the Journey tab; the validator enforces this).
2. **New people** — add a row to a file in `data/peoples/`:
   `['Country','Group name','One-line note',['$I>dec@~45 kya','Wave label|ir@~9 kya>dec@~5 kya']]`
   - A route is `place@date>place@date>…`. The first route is the main ancestry; extra routes
     (`Label|…`) are later admixture waves, drawn in their own colours.
   - `$ID` expands a shared stem from `data/stems.js` (e.g. `$A` = Africa → Arabia, `$E` = … → East Asia).
3. **New journey stop** — add `['id','parentId','~date','note']` to `data/journey.js`.
4. Run `node tools/validate.js` (optional, needs Node). It reports unknown places, missing parents, duplicates and bad stems.

Dates use `~` for approximations; `kya` = thousand years ago. Routes are simplified summaries of
mainstream genetics/archaeology, and many details are debated.
"# hmc" 
