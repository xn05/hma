/* TABLE peoples (Middle East & Caucasus): country, name, note, routes[]
   First route = main ancestry; extra routes are 'Label|key@date>key@date' admixture waves. $STEM expands from data/stems.js. */
DB.bulk('peoples',['country','name','note','routes'],[
["Iran","Persians","Ancient Iranian plateau ancestry plus Indo-Iranian steppe pastoralists ~3 kya.",["$L>ir@~50 kya","Indo-Iranians|ste@~4 kya>ca@~3.5 kya>ir@~3 kya"]],
["Turkey","Turks","Anatolian farmer ancestry mixed with Turkic groups arriving from Central Asia after ~1071 CE.",["$L>ana@~45 kya","Turkic migration|mon@~2 kya>ca@~1 kya>ana@~1071 CE"]],
['Saudi Arabia','Arabs','Near Eastern farmers and Bronze Age pastoralists; Arabic spread widely after the 7th century CE.',['$A']],
['Lebanon','Lebanese','Levantine continuity from Canaanite and Phoenician times with later mixing.',['$L']],
['Iraq','Mesopotamian Arabs','Ancient Mesopotamian farming heartland populations.',['$L>mso@~10 kya']],
['Iraq','Kurds','Zagros highland peoples with ancient Near Eastern ancestry.',['$L>zag@~10 kya']],
['Armenia','Armenians','Long-standing highland population with ~4,500 years of continuity.',['$L>arm@~10 kya']],
['Georgia','Georgians','Caucasus populations with Caucasus hunter-gatherer ancestry.',['$L>cau@~40 kya']],
],{region:'mideast'});
