const _ = require('lodash');


var names = { 'a': "atrij Jadon", 'b': 'KAladon', 'c': 3};
 

const newnames= _.pick(names, ['a', 'b']);
console.log(newnames);