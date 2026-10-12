/* TABLE peoples (Europe): country, name, note, routes[]
   First route = main ancestry; extra routes are 'Label|key@date>key@date' admixture waves. $STEM expands from data/stems.js. */
DB.bulk('peoples',['country','name','note','routes'],[
["United Kingdom","British","Layered ancestry: Ice Age hunter-gatherers, Anatolian farmers (~6 kya) and Steppe/Bell Beaker people (~4.5 kya), later Anglo-Saxons and Vikings.",["$L>bal@~45 kya>we@~42 kya>uk@~14 kya","Anatolian farmers|ana@~9 kya>bal@~8 kya>we@~6 kya>uk@~6 kya","Steppe / Bell Beaker|ste@~5 kya>we@~4.5 kya>uk@~4.5 kya"]],
['Spain','Basques','Ancient Iberian farmer roots with notable continuity and less steppe ancestry.',['$EU>ibe@~40 kya','Anatolian farmers|ana@~9 kya>ibe@~7.5 kya']],
['Spain','Spaniards','Iberian farmers plus Steppe ancestry (~4.5 kya), Romans, Visigoths and North Africans.',['$EU>ibe@~40 kya','Steppe pastoralists|ste@~5 kya>we@~4.5 kya>ibe@~4.4 kya']],
['Italy','Italians','Anatolian farmers, Steppe pastoralists and later Mediterranean mixing.',['$L>bal@~45 kya>ita@~40 kya','Anatolian farmers|ana@~9 kya>gre@~8.5 kya>ita@~8 kya']],
['Greece','Greeks','Anatolian farmers plus Steppe ancestry, with Mycenaean and Minoan continuity.',['$L>gre@~45 kya','Anatolian farmers|ana@~9 kya>gre@~8.5 kya']],
['Germany','Germans','Western hunter-gatherers, Anatolian farmers and Corded Ware steppe ancestry.',['$EU>ger@~40 kya','Corded Ware|ste@~5 kya>ger@~4.8 kya']],
['France','French','Layered ancestry from Cro-Magnons, farmers, steppe peoples, Celts and Franks.',['$EU','Anatolian farmers|ana@~9 kya>bal@~8 kya>we@~7 kya','Steppe pastoralists|ste@~5 kya>we@~4.5 kya']],
['Ireland','Irish','Strong Steppe / Bell Beaker ancestry arriving ~4,400 years ago.',['$EU>ire@~10 kya','Bell Beaker|ste@~5 kya>we@~4.5 kya>ire@~4.4 kya']],
['Iceland','Icelanders','Norse settlers (~874 CE) with many Gaelic women from Ireland and Scotland.',['$EU>sca@~12 kya>ice@~874 CE','Gaelic settlers|ire@~874 CE>ice@~874 CE']],
['Norway','Norwegians','Scandinavian hunter-gatherers plus farmers and Steppe ancestry.',['$EU>sca@~12 kya','Corded Ware|ste@~5 kya>sca@~4.8 kya']],
['Finland','Finns & Sami','Uralic-speaking peoples with Siberian ancestry arriving ~3.5 kya.',['$EU>fin@~10 kya','Uralic migration|ura@~4 kya>fin@~3.5 kya']],
['Poland','Poles (Slavs)','Slavic expansion across Eastern Europe from ~1,500 years ago.',['$EU>pol@~30 kya','Slavic expansion|rus@~500 CE>pol@~600 CE']],
['Russia','Russians','East Slavic peoples with Steppe, Baltic and Uralic ancestry.',['$L>bal@~45 kya>rus@~35 kya','Steppe pastoralists|ste@~5 kya>rus@~4.5 kya']],
['Russia','Yakuts (Sakha)','Turkic speakers who moved north along the Lena from the Baikal region.',['$Z>sib@~31 kya','Turkic migration|bai@~1000 CE>yak@~1300 CE']],
['Hungary','Magyars','Uralic-speaking migrants from the Urals who settled the Pannonian Basin in 895 CE.',['$EU>pan@~40 kya','Magyar migration|ura@~895 CE>pan@~895 CE']],
],{region:'europe'});
