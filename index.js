var moment = require('moment');

const tgl_awal = `2021-01-01`;
const tenor = 12;

const hitungTenor = (tgl, tenor) => {
  return moment(tgl).add(tenor, 'months').format('YYYY-MM-DD');
}

const tgl_jtp = {};
for (i = 1; i <= tenor; i++) {
  tgl_jtp[i] = hitungTenor(tgl_awal, i);
};

console.log(tgl_jtp);