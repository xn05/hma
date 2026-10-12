/* TABLE peoples (The Americas): country, name, note, routes[]
   First route = main ancestry; extra routes are 'Label|key@date>key@date' admixture waves. $STEM expands from data/stems.js. */
DB.bulk('peoples',['country','name','note','routes'],[
["Mexico","Maya & Nahua","Descend from the first Americans who moved south ~14 kya; farming (maize) later built great civilisations.",["$B>mes@~14 kya"]],
["Peru","Quechua & Andean peoples","Descend from early South Americans in the Andes (~13 kya); Inca civilization rose ~1400s CE.",["$B>mes@~14 kya>and@~13 kya"]],
["USA","Native Americans","Descend from East Eurasians who crossed Beringia and reached the Americas ~16–15 kya.",["$B"]],
["USA","Native Hawaiians","Polynesian voyagers, descended from Austronesian seafarers.",["$PO>hw@~1000–1200 CE"]],
['USA','Navajo & Apache (Athabaskan)','Athabaskan speakers who migrated south from the subarctic ~1,000 years ago.',['$B','Athabaskan migration|na@~1000 CE>sw@~1400 CE']],
['USA','Plains & Eastern Woodland nations','Descendants of early peoples who spread across the continent after ~14 kya.',['$B>gp@~13 kya']],
['USA','African Americans','Largely West and Central African ancestry from the forced transatlantic slave trade (1619–1860s), mixed with European and Native ancestry.',['$W','Forced Atlantic crossing|waf@~1619 CE>se@~1619 CE']],
['Canada','Inuit','Thule culture ancestors who spread east from Alaska ~1,000 years ago.',['$Z>sib@~31 kya>ber@~22 kya','Thule expansion|ber@~1000 CE>arc@~1100 CE']],
['Canada','Cree & Ojibwe (Algonquian)','Woodland peoples of the boreal forest, spreading as the ice retreated.',['$B>ne@~12 kya']],
['Greenland','Kalaallit (Greenlandic Inuit)','Arrived from the Canadian Arctic ~1200 CE in a late Thule expansion.',['$Z>sib@~31 kya>ber@~22 kya','Thule expansion|ber@~1000 CE>arc@~1100 CE>grn@~1200 CE']],
['Dominican Republic','Taíno','Arawakan speakers who reached the Caribbean from South America ~2,500 years ago.',['$AM>and@~13 kya>amz@~5 kya','Arawakan migration|amz@~2.5 kya>car@~2.5 kya']],
['Colombia','Muisca','Chibcha-speaking farmers of the Andes highlands.',['$AM>col@~12 kya']],
['Bolivia','Aymara','Altiplano peoples of Lake Titicaca.',['$AN']],
['Brazil','Tupi-Guarani','Amazonian peoples who expanded across lowland South America ~3,000 years ago.',['$AN>amz@~10 kya','Tupi expansion|amz@~3 kya>bra@~2 kya']],
['Brazil','Yanomami','Amazon forest people with very low outside admixture.',['$AN>amz@~10 kya']],
['Chile','Mapuche','Central-southern Andes peoples who resisted Inca and Spanish rule.',['$AN>chi@~12 kya']],
['Chile','Rapa Nui','Polynesian voyagers who settled Easter Island ~1200 CE.',['$PO>ez@~1200 CE']],
['Argentina','Tehuelche','Patagonian hunter-gatherers.',['$AN>pam@~12 kya>pat@~11 kya']],
],{region:'americas'});
