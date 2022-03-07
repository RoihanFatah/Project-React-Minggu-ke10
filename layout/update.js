import {link} from './link.js';

export function update() {
    let id = 29;
    let data = {
        pelanggan : 'update export/import js',
        alamat : 'update alamat export/import js',
        telp : '0666666'
    };

    link.put('/pelanggan/' + id, data).then(res => {
        console.log(res);

        let tampil = `<h1>${res.data.pesan}</h1>`;

        document.querySelector("#out").innerHTML = tampil;
        });
}
