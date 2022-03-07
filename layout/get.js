import {link} from './link.js';

export function get() {
    link.get('/pelanggan').then(res => {
        console.log(res);

        let tampil = `<table class="table">
        <tr>
            <th>ID Pelanggan</th>
            <th>Pelanggan</th>
            <th>Alamat</th>
            <th>No. Telp</th>
        </tr>
        `;

        res.data.forEach(elem => {
            tampil += `
            <tr>
                <td>${elem.idpelanggan}</td>
                <td>${elem.pelanggan}</td>
                <td>${elem.alamat}</td>
                <td>${elem.telp}</td>
            </tr>
            `;
        });

        tampil += `</table>`;

        document.querySelector('#out').innerHTML = tampil;
    });
}


