import React from 'react';
import useGet from '../Hook/useGet';
import useDelete from '../Hook/useDelete';

const Pelanggan = () => {

    const [isi] = useGet('/pelanggan');
    const {hapus, pesan} = useDelete('/pelanggan/');

    let no = 1;

    return (
        <div>
            <div className="row">
                <h2 className='mb-4'>Data Pelanggan</h2>
                <hr />
            </div>
            <div className="row">
                <div>
                    <h4 className='mb-4'><i>{pesan}</i></h4>
                </div>
            </div>
            <div className="row">
                <table className='table'>
                    <thead>
                        <tr>
                            <th><h5>No.</h5></th>
                            <th><h5>Pelanggan</h5></th>
                            <th><h5>Alamat</h5></th>
                            <th><h5>Telp</h5></th>
                            <th><h5>Delete</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isi.map((val,index) => (
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.pelanggan}</td>
                                    <td>{val.alamat}</td>
                                    <td>{val.telp}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => hapus(val.idpelanggan)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pelanggan;
