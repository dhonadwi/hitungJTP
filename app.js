//pk 05.0228
var moment = require('moment');

const tgl_awal = `2021-01-31`;
const tenor = 12;
const tgl_bayar = {
  1: '2021-02-26',
  2: '2021-04-27',
  3: '2021-05-31',
  4: '2021-06-02',
};
const jml_bayar = Object.keys(tgl_bayar).length;

const pembayaran = {
  async init(tgl, tenor) {
    this.tgl = tgl;
    this.tenor = tenor;

    await this.bulanAngsuran();
  },

  async bulanAngsuran() {
    const tgl_jtp = {};
    for (i = 1; i <= this.tenor; i++) {
      tgl_jtp[i] = await moment(this.tgl).add(i, 'months').format('YYYY-MM-DD');
    }
    this.bayar(tgl_jtp)
  },
  async bayar(tgl_jtp) {
    const tgl_pembayaran = {};
    for (i = 1; i <= jml_bayar; i++) {
      tgl_pembayaran[i] = await `angsuran ke ${i} : ` + (new Date(tgl_bayar[i]) - new Date(tgl_jtp[i])) / 86400000 + ` hari`;
    }
    this.histori(tgl_jtp, tgl_pembayaran);
  },
  async histori(jtp, bayar) {
    const histori = {};
    for (i = 1; i <= tenor; i++) {

      histori[i] = `${jtp[i]} - ${tgl_bayar[i]} | ${bayar[i]}`; //${denda[i]}`;
    };

    console.log(histori);

  }
};

pembayaran.init(tgl_awal, tenor);
