const ceker = require("./ceker");
const data = require('./rsc/2019.json')

const liburKah = (tgl) => {
  const date = new Date(tgl);  
  
  return ceker(date, data)
};


module.exports = liburKah