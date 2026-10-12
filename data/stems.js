/* TABLE stems: id, route, note. Shared route prefixes; use as $ID inside a route (they can nest). */
DB.bulk('stems',['id','route','note'],[
['A','af@~300–200 kya>ar@~70–60 kya','Out of Africa'],
['I','$A>in@~55 kya','To India'],
['S','$I>sea@~60–50 kya','To Southeast Asia'],
['E','$S>ea@~45 kya','To East Asia'],
['L','$A>lv@~55–50 kya','To the Levant'],
['Z','$L>ca@~45 kya','To Central Asia'],
['B','$Z>sib@~31 kya>ber@~22 kya>na@~16 kya','To North America'],
['PO','$E>tai@~5 kya>mel@~3.3 kya>sam@~2.8 kya','To Polynesia'],
['AF','af@~300–200 kya','Start: Africa'],['W','$AF>waf@~100 kya','West Africa'],['BN','waf@~5 kya>cng@~3.5 kya>gl@~2.5 kya','Bantu expansion'],['AM','$B>mes@~14 kya','To Mesoamerica'],['AN','$AM>and@~13 kya','To the Andes'],['EU','$L>bal@~45 kya>we@~42 kya','To Western Europe'],['AUS','$E>tai@~5 kya','Austronesian expansion'],
]);
