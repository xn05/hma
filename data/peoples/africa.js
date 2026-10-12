/* TABLE peoples (Africa): country, name, note, routes[]
   First route = main ancestry; extra routes are 'Label|key@date>key@date' admixture waves. $STEM expands from data/stems.js. */
DB.bulk('peoples',['country','name','note','routes'],[
["Nigeria","Yoruba & Igbo","Long-resident West African populations; Niger-Congo languages spread with farming from this region.",["af@~300–200 kya>waf@~100 kya+"]],
["South Africa","San (Khoisan)","Among the deepest genetic divergences of any living people, lineages here go back 200+ kya.",["af@~300–200 kya>saf@~150–100 kya"]],
["South Africa","Zulu & Xhosa (Bantu)","Descend from Bantu-speaking farmers who migrated south over several thousand years.",["waf@~5 kya>cng@~3.5 kya>gl@~2.5 kya>saf@~1.7 kya"]],
['Egypt','Egyptians','Nile Valley peoples blended with Near Eastern farmers and later Arab, Greek and Nubian ancestry.',['$AF>nil@~50 kya','Near Eastern farmers|lv@~10 kya>nil@~7 kya']],
['Sudan','Nubians','Ancient Nile Valley kingdoms (Kerma, Kush) with Nilotic and Egyptian ties.',['$AF>nil@~50 kya>sud@~5 kya']],
['Ethiopia','Amhara & Oromo','Deep East African roots plus Near Eastern ancestry crossing the Red Sea ~3 kya.',['$AF>eth@~100 kya','Back-migration from Arabia|ar@~3 kya>eth@~2.8 kya']],
['Somalia','Somalis','Cushitic-speaking Horn of Africa peoples with some Arabian ancestry.',['$AF>som@~100 kya']],
['Kenya','Kikuyu (Bantu)','Bantu farmers who reached East Africa ~2.5 kya.',['$BN>ken@~1.5 kya']],
['Kenya','Maasai (Nilotic)','Pastoralists who moved south from the Nile region in the last ~1,000 years.',['$AF>nil@~50 kya','Nilotic migration|sud@~1000 CE>ken@~1500 CE']],
['Tanzania','Hadza','Hunter-gatherers with very deep East African lineages.',['$AF>gl@~100 kya']],
['DR Congo','Mbuti & Baka (Pygmy)','Rainforest hunter-gatherers carrying some of the oldest human lineages.',['$AF>cng@~70 kya']],
['Nigeria','Fulani','Pastoralists spread across the Sahel with some North African ancestry.',['$W','North African pastoralists|naf@~5 kya>sahel@~3 kya']],
['Ghana','Akan','West African farming populations of the Niger-Congo family.',['$W']],
['Morocco','Amazigh (Berbers)','North African roots plus Neolithic farmers from Iberia and later Arab arrivals.',['$AF>naf@~300 kya','Neolithic farmers|ibe@~7 kya>naf@~6 kya','Arab migration|ar@~700 CE>mag@~700 CE']],
['Madagascar','Malagasy','A unique blend of Bantu and Austronesian ancestry from Borneo ~1,300 years ago.',['$BN>mad@~1.3 kya','Austronesian voyagers|bor@~1.5 kya>mad@~1.3 kya']],
],{region:'africa'});
