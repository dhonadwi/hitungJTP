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
  init(container, tgl, tenor) {
    this.container = container;
    this.tgl = tgl;
    this.tenor = tenor;

    this.bulanAngsuran();
  },

  bulanAngsuran() {
    const tgl_jtp = {};
    for (i = 1; i <= this.tenor; i++) {
      tgl_jtp[i] = moment(this.tgl).add(i, 'months').format('YYYY-MM-DD');
    }
    this.bayar(tgl_jtp)
  },

  bayar(tgl_jtp) {
    const tgl_pembayaran = {};
    for (i = 1; i <= jml_bayar; i++) {
      tgl_pembayaran[i] = `angsuran ke ${i} : ` + (new Date(tgl_bayar[i]) - new Date(tgl_jtp[i])) / 86400000 + ` hari`;
    }
    this.histori(tgl_jtp, tgl_pembayaran);
  },

  histori(jtp, bayar) {
    const histor = {};
    for (i = 1; i <= tenor; i++) {
      histor[i] = {
        "jatuhtempo": jtp[i],
        "tgl_bayar": tgl_bayar[i],
        "keterangan": bayar[i],
      }
    };
    const historLength = Object.keys(histor).length;
    for (i = 1; 1 <= historLength; i++) {
      let ket = '';
      let bayar = '';
      if (histor[i].keterangan != undefined) {
        ket = histor[i].keterangan;
      }
      if (histor[i].tgl_bayar != null) {
        bayar = histor[i].tgl_bayar;
      }
      this.container.innerHTML += `
      <tr>
        <td width='50px'>${i}</td>
        <td width='150px'>${histor[i].jatuhtempo}</td>
        <td width='100px'>${bayar}</td >
      <td>${ket}</td>
      </tr > `;
    }
  }
};

const containHistori = document.querySelector('.container');
pembayaran.init(containHistori, tgl_awal, tenor);


// const tesDulu = {
//   apa(a, b) {
//     this.a = a;
//     this.b = b;
//     this.skuy();
//   },
//   skuy() {
//     // return this.a * this.b;
//     console.log(this.a * this.b);
//   }
// };

// const hasilKali = tesDulu.apa(4, 3);
// console.log(hasilKali);
