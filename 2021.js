const ceker = require("./ceker");
const data = require('./rsc/2021.json')

const liburKah = (tgl) => {
  const date = new Date(tgl);  
  
  return ceker(date, data)
};


module.exports = liburKah