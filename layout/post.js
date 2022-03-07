import {link} from './link.js';

export function post() {
    let data = {
        pelanggan : 'export/import js',
        alamat : 'alamat export/import js',
        telp : '0999999'
    };

    link.post('/pelanggan', data).then(res => {
        console.log(res);

        let tampil = `<h1>${res.data.pesan}</h1>`;

        document.querySelector("#out").innerHTML = tampil;
    });
}
