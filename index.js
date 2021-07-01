var moment = require('moment');

const tgl_awal = `2021-01-28`;
const tenor = 12;

const hitungTenor = (tgl, tenor) => {
  return moment(tgl).add(tenor, 'months').format('YYYY-MM-DD');
}
const tgl_jtpArray = [tgl_awal];
const tgl_jtp = {};
for (i = 1; i <= tenor; i++) {
  tgl_jtp[i] = hitungTenor(tgl_awal, i);
  tgl_jtpArray.push(hitungTenor(tgl_awal, i))
};

const tgl_bayar = {
  1: '2021-02-26',
  2: '2021-04-27',
  3: '2021-05-31',
  4: '2021-06-02'
}

const jml_bayar = Object.keys(tgl_bayar).length;
const denda = {};
for (i = 1; i <= jml_bayar; i++) {
  denda[i] = `angsuran ke ${i} : ` + (new Date(tgl_bayar[i]) - new Date(tgl_jtp[i])) / 86400000 + ` hari`;
}

const histori = {};
for (i = 1; i <= tenor; i++) {
  histori[i] = `${tgl_jtp[i]} - ${tgl_bayar[i]} : ${denda[i]}`;
};

console.log(histori);
