const { readFileSync, writeFileSync } = require('fs')
const cheerio = require('cheerio')

const monthNames = [
  'januari',
  'februari',
  'maret',
  'april',
  'mei',
  'juni',
  'juli',
  'agustus',
  'september',
  'oktober',
  'november',
  'desember'
]
const dayInterval = 1000 * 60 * 60 * 24; // 1 day in ms

module.exports = parseHoliday

function parseHoliday(htm, year) {
  const $ = cheerio.load(htm)
  const rows = $('table.publicholidays.phgtable > tbody > tr')
  const placeholder = []
  rows.each((x, row) => {
    let parentClass = $(row).attr('class')
    if (parentClass && ['even', 'odd'].includes(parentClass.trim())) {
      const [_date, day, desc] = $(row).find('td').toArray()

      const ds = $(_date).text()
      const x = ds.split(' ').filter(Boolean)

      const [dateFrom, monthFrom] = x.slice(0, 2)

      const monthIndexFrom = monthNames.findIndex(m => m === monthFrom.toLowerCase())
      const date = createIdDate(year, monthIndexFrom, dateFrom)

      if (x.length > 2) {
        const [dateTo, monthTo] = x.slice(-2)
        const monthIndexTo = monthNames.findIndex(m => m === monthTo.toLowerCase())
        if (monthIndexFrom > -1) {
          const to = createIdDate(year, monthIndexTo, dateTo)
          const dates = getDates(date, to, dayInterval)
          const holiday = dates.map(d => ({
            tanggal: [ds, year].join(' '),
            date: idISOString(d),
            desc: $(desc).text().trim(),
          }))

          placeholder.push(...holiday)
        }
      } else {
        const holiday = {
          tanggal: [ds, year].join(' '),
          date: idISOString(date),
          desc: $(desc).text().trim()
        }
        placeholder.push(holiday)
      }
    }
  })
  
  return placeholder
}

function getDates(startDate, endDate, interval) {
  const duration = endDate - startDate;
  const steps = duration / interval;
  return Array.from({ length: steps + 1 }, (v, i) => new Date(startDate.valueOf() + (interval * i)));
}

function idISOString(date) {
  const offset = -25200000 // date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - (offset)).toISOString().slice(0, -1) + '+07:00';
}

function createIdDate(fullYear, nMonth, nDate) {
  const mm = String(nMonth + 1).padStart(2, '0')
  const dd = String(nDate).padStart(2, '0')
  return new Date(`${fullYear}-${mm}-${dd}T00:00:00.000+07:00`)
}