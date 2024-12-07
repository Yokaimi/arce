let daftarBuku = [];

const NAMA_PENYIMPANAN = 'RAK_BUKU_APP';

const bikinId = () => {
  return +new Date();
};

const adaPenyimpanan = () => {
  if (typeof Storage === 'undefined') {
    alert('Browser lu ga support localStorage nih');
    return false;
  }
  return true;
};

const simpanData = () => {
  if (adaPenyimpanan()) {
    localStorage.setItem(NAMA_PENYIMPANAN, JSON.stringify(daftarBuku));
  }
};

const ambilDataDariPenyimpanan = () => {
  const dataMentah = localStorage.getItem(NAMA_PENYIMPANAN);
  const data = JSON.parse(dataMentah);
  
  if (data !== null) {
    daftarBuku = data;
  }
  
  document.dispatchEvent(new Event('dataNyaDahKeload'));
};

const bikinBuku = (judul, penulis, tahun, udahKelar) => {
  return {
    id: bikinId(),
    judul,
    penulis,
    tahun: parseInt(tahun),
    udahKelar
  };
};

const bikinElemenBuku = (dataBuku) => {
  const wadahBuku = document.createElement('div');
  wadahBuku.setAttribute('data-bookid', dataBuku.id);
  wadahBuku.setAttribute('data-testid', 'bookItem');

  const judul = document.createElement('h3');
  judul.setAttribute('data-testid', 'bookItemTitle');
  judul.innerText = dataBuku.judul;

  const penulis = document.createElement('p');
  penulis.setAttribute('data-testid', 'bookItemAuthor');
  penulis.innerText = `Penulis: ${dataBuku.penulis}`;

  const tahun = document.createElement('p');
  tahun.setAttribute('data-testid', 'bookItemYear');
  tahun.innerText = `Tahun: ${dataBuku.tahun}`;

  const wadahTombol = document.createElement('div');
  
  const tombolStatus = document.createElement('button');
  tombolStatus.setAttribute('data-testid', 'bookItemIsCompleteButton');
  tombolStatus.innerText = dataBuku.udahKelar ? 'Belum selesai dibaca' : 'Selesai dibaca';
  tombolStatus.onclick = () => ubahStatusBuku(dataBuku.id);

  const tombolHapus = document.createElement('button');
  tombolHapus.setAttribute('data-testid', 'bookItemDeleteButton');
  tombolHapus.innerText = 'Hapus buku';
  tombolHapus.onclick = () => hapusBuku(dataBuku.id);

  const tombolEdit = document.createElement('button');
  tombolEdit.setAttribute('data-testid', 'bookItemEditButton');
  tombolEdit.innerText = 'Edit buku';
  tombolEdit.onclick = () => editBuku(dataBuku.id);

  wadahTombol.append(tombolStatus, tombolHapus, tombolEdit);
  wadahBuku.append(judul, penulis, tahun, wadahTombol);

  return wadahBuku;
};

const tambahBuku = () => {
  const judul = document.getElementById('bookFormTitle').value;
  const penulis = document.getElementById('bookFormAuthor').value;
  const tahun = document.getElementById('bookFormYear').value;
  const udahKelar = document.getElementById('bookFormIsComplete').checked;

  const bukuBaru = bikinBuku(judul, penulis, tahun, udahKelar);
  daftarBuku.push(bukuBaru);

  document.dispatchEvent(new Event('bukuBerubah'));
  simpanData();
};

const cariBuku = (katakunci) => {
  const bukuNyaCocok = daftarBuku.filter(buku => 
    buku.judul.toLowerCase().includes(katakunci.toLowerCase())
  );
  
  const rakBelumKelar = document.getElementById('incompleteBookList');
  const rakUdahKelar = document.getElementById('completeBookList');
  
  rakBelumKelar.innerHTML = '';
  rakUdahKelar.innerHTML = '';

  for (const buku of bukuNyaCocok) {
    const elemenBuku = bikinElemenBuku(buku);
    if (buku.udahKelar) {
      rakUdahKelar.append(elemenBuku);
    } else {
      rakBelumKelar.append(elemenBuku);
    }
  }
};

const hapusBuku = (idBuku) => {
  const indexBuku = daftarBuku.findIndex(buku => buku.id === idBuku);
  
  if (indexBuku !== -1) {
    daftarBuku.splice(indexBuku, 1);
    document.dispatchEvent(new Event('bukuBerubah'));
    simpanData();
  }
};

const ubahStatusBuku = (idBuku) => {
  const indexBuku = daftarBuku.findIndex(buku => buku.id === idBuku);
  
  if (indexBuku !== -1) {
    daftarBuku[indexBuku].udahKelar = !daftarBuku[indexBuku].udahKelar;
    document.dispatchEvent(new Event('bukuBerubah'));
    simpanData();
  }
};

const editBuku = (idBuku) => {
  const buku = daftarBuku.find(buku => buku.id === idBuku);
  if (!buku) return;

  document.getElementById('bookFormTitle').value = buku.judul;
  document.getElementById('bookFormAuthor').value = buku.penulis;
  document.getElementById('bookFormYear').value = buku.tahun;
  document.getElementById('bookFormIsComplete').checked = buku.udahKelar;

  hapusBuku(idBuku);
};

const tampilinBuku = () => {
  const rakBelumKelar = document.getElementById('incompleteBookList');
  const rakUdahKelar = document.getElementById('completeBookList');
  
  rakBelumKelar.innerHTML = '';
  rakUdahKelar.innerHTML = '';

  for (const buku of daftarBuku) {
    const elemenBuku = bikinElemenBuku(buku);
    if (buku.udahKelar) {
      rakUdahKelar.append(elemenBuku);
    } else {
      rakBelumKelar.append(elemenBuku);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const formBuku = document.getElementById('bookForm');
  const formCari = document.getElementById('searchBook');
  
  formBuku.addEventListener('submit', (e) => {
    e.preventDefault();
    tambahBuku();
    formBuku.reset();
  });

  formCari.addEventListener('submit', (e) => {
    e.preventDefault();
    const katakunci = document.getElementById('searchBookTitle').value;
    cariBuku(katakunci);
  });

  if (adaPenyimpanan()) {
    ambilDataDariPenyimpanan();
  }
});

document.addEventListener('bukuBerubah', () => {
  tampilinBuku();
});

document.addEventListener('dataNyaDahKeload', () => {
  tampilinBuku();
});
