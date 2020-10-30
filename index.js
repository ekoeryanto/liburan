const ceker = require("./ceker");

const liburKah = (tgl) => {
  const date = new Date(tgl);  
  const year = date.getFullYear()
  const data = require(`./rsc/${year}.json`)
  
  return ceker(date, data)
};


module.exports = liburKah