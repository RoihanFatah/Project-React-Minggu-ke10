import React, {useState} from 'react';
import useGet from '../Hook/useGet';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { link } from '../Axios/link';

Modal.setAppElement('#root');

const Order = () => {

    let today = new Date().toISOString().slice(0,10);

    const [tglawal, setTglawal] = useState('2022-01-01');
    const [tglakhir, setTglakhir] = useState(today);
    const [isi] = useGet(`/order/${tglawal}/${tglakhir}`);
    const {register, handleSubmit,setValue, formState:{errors}} = useForm();
    const [mOpen, setMOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [pelanggan, setPelanggan] = useState('');
    const [idorder, setIdorder] = useState('');

    function cari(data) {
        setTglawal(data.tAwal);
        setTglakhir(data.tAkhir);
    }

    function filterData(id) {
        const data = isi.filter((val) => (val.idorder === id));
        setPelanggan(data[0].pelanggan);
        setTotal(data[0].total);
        setIdorder(data[0].idorder);
        setMOpen(true);
    }

    function isiForm() {
        setValue('total', total);
    }

    async function simpan(data) {
        let hasil = {
            bayar : data.bayar,
            kembali : data.bayar - data.total,
            status : 1
        }

        const res = await link.put('/order/' + idorder, hasil);

        setMOpen(false);
    }

    let no = 1;

    return (
        <div>
            <Modal 
                isOpen={mOpen} 
                onRequestClose={ () => setMOpen(false)}
                onAfterOpen={isiForm}
                style={
                    {
                        overlay:{
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content:{   
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width:'50%',
                            height:'65%'
                        }
                    }
                }>
                    <div className="row">
                        <h2>Pembayaran <span className='fw-light'>{pelanggan}</span></h2>
                        <hr />
                    </div>
                    <div className="row">
                        <div className='col'>
                            <form onSubmit={handleSubmit(simpan)}>
                                <div className="mb-3 mt-1">
                                    <label htmlFor="total" className="form-label">Total</label>
                                    <input 
                                        type="text"
                                        className="form-control" 
                                        name='total' 
                                        placeholder="Total"
                                        {...register('total', {required: true})} />
                                </div>
                                <div className="mb-lg-4">
                                    <label htmlFor="bayar" className="form-label">Nominal Pembayaran</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name='bayar' 
                                        placeholder="Isi Nominal Pembayaran"
                                        {...register('bayar', {required: true, min:total})} />
                                    <h6>{errors.bayar && "*Nominal pembayaran kurang"}</h6>
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="submit" 
                                        className="btn btn-danger me-3" 
                                        name='submit' 
                                        value='Cancel' 
                                        onClick={ () => setMOpen(false)}
                                        />
                                    <input 
                                        type="submit" 
                                        className="btn btn-primary" 
                                        name='submit' 
                                        value='Bayar'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
            </Modal>
            <div className="row">
                <div>
                    <h2>Data Order</h2>
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
                                <th><h6>Pelanggan</h6></th>
                                <th><h6>Tgl. Order</h6></th>
                                <th><h6>Total</h6></th>
                                <th><h6>Bayar</h6></th>
                                <th><h6>Kembali</h6></th>
                                <th><h6>Status</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isi.map((val,index) => (
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.idorder}</td>
                                    <td>{val.pelanggan}</td>
                                    <td>{val.tglorder}</td>
                                    <td>{val.total}</td>
                                    <td>{val.bayar}</td>
                                    <td>{val.kembali}</td>
                                    <td>
                                        {
                                            val.status === 0 ? (
                                                <button 
                                                    className='btn btn-primary' 
                                                    onClick={ () => filterData(val.idorder)}>Bayar</button>
                                            ) : (
                                                <h5>Lunas</h5>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Order;
