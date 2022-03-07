import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import useGet from '../Hook/useGet';

const Detail = () => {
    
    let today = new Date().toISOString().slice(0,10);
    let no = 1;

    const [tglawal, setTglawal] = useState('2022-01-01');
    const [tglakhir, setTglakhir] = useState(today);
    const [isi] = useGet(`/detail/${tglawal}/${tglakhir}`);
    const {register, handleSubmit} = useForm();

    function cari(data) {
        setTglawal(data.tAwal);
        setTglakhir(data.tAkhir);
    }

    return (
        <div>
            <div className="row">
                <div>
                    <h2>Data Order Detail</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className='col-5'>
                    <form onSubmit={handleSubmit(cari)}>
                        <div className="mb-4 mt-1">
                            <label htmlFor="tAwal" className="form-label">Tanggal Awal</label>
                            <input 
                                type="date"
                                className="form-control" 
                                name='tAwal' 
                                {...register('tAwal', {required: null})} />
                        </div>
                        <div className="mb-3 mt-1">
                            <label htmlFor="tAkhir" className="form-label">Tanggal Akhir</label>
                            <input 
                                type="date"
                                className="form-control" 
                                name='tAkhir' 
                                {...register('tAkhir', {required: null})} />
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" name='submit' />
                        </div>
                    </form>
                </div>
            </div>
            <hr />
            <div className="row">
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th><h6>No.</h6></th>
                                <th><h6>Invoice</h6></th>
                                <th><h6>Tgl. Order</h6></th>
                                <th><h6>Menu</h6></th>
                                <th><h6>Harga</h6></th>
                                <th><h6>Jumlah</h6></th>
                                <th><h6>Total</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isi.map((val,index) => (
                                    <tr key={index}>
                                        <td>{no++}</td>
                                        <td>{val.idorder}</td>
                                        <td>{val.tglorder}</td>
                                        <td>{val.menu}</td>
                                        <td>{val.hargajual}</td>
                                        <td>{val.jumlah}</td>
                                        <td>{val.hargajual * val.jumlah}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Detail;
