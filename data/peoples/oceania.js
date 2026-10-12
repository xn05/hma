/* TABLE peoples (Oceania): country, name, note, routes[]
   First route = main ancestry; extra routes are 'Label|key@date>key@date' admixture waves. $STEM expands from data/stems.js. */
DB.bulk('peoples',['country','name','note','routes'],[
["Australia","Aboriginal Australians","Among the oldest continuous cultures on Earth, here for ~65–50 kya.",["$S>sah@~65–50 kya"]],
["New Zealand","Māori","Polynesian voyagers who settled Aotearoa ~1250–1300 CE.",["$PO>nz@~1250–1300 CE"]],
['Papua New Guinea','Highland Papuans','Descendants of the first Sahul settlers; highland farming began ~9 kya.',['$S>sah@~50 kya>png@~45 kya']],
['Fiji','Fijians','A mix of Austronesian-Lapita and Melanesian ancestry.',['$AUS>mel@~3.3 kya>fij@~3 kya']],
['Samoa','Samoans','Lapita voyagers settled ~2,800 years ago.',['$PO']],
['Tonga','Tongans','An early Polynesian homeland.',['$PO']],
['French Polynesia','Tahitians','Polynesian voyagers who settled the Society Islands ~1,000 years ago.',['$PO>tah@~1000 CE']],
['Vanuatu','Ni-Vanuatu','Melanesian peoples with Lapita ancestry.',['$AUS>mel@~3.3 kya>van@~3 kya']],
['Micronesia','Micronesians','Settled from the Philippines ~3,500 years ago.',['$AUS>ph@~4 kya>mic@~3.5 kya']],
['Australia','Palawa (Tasmanian Aboriginal)','Isolated for ~10,000 years after rising seas cut Tasmania off.',['$S>sah@~65–50 kya>tas@~40 kya']],
],{region:'oceania'});
