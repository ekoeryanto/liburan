module.exports = function (date, data) {
  if (isNaN(date.getTime())) throw new Error("Format tanggal salah.");

  date.setHours(0, 0, 0, 0)

  const libur = data.findIndex((l) => {
    return Date.parse(l.date) === date.getTime();
  });

  return libur > -1;
};
