import React, {useState} from 'react';
import {link} from '../Axios/link';
import {useForm} from 'react-hook-form';
import useGet from '../Hook/useGet';



const Kategori = () => {

    // variabel untuk mengambil data dari apirestoran lalu dimasukkan ke variabel isi
    const [isi] = useGet('/kategori');

    // useState untuk menampung pesan setelah insert data
    const [pesan, setPesan] = useState('');

    // usetate untuk menampung idkategori
    const [idkategori, setIdkategori] = useState('');

    //
    const [pilihan, setPilihan] = useState(true);

    // Variabel untuk react-hook-form
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm();

    

    // function untuk button submit
    function simpan(data) {

        if (pilihan) {
            // untuk insert data
            link.post('/kategori', data).then(res => setPesan(res.data.pesan));
        } else {
            // untuk update data
            link.put('/kategori/' + idkategori, data).then(res => setPesan(res.data.pesan));

            setPilihan(true);
        }
        
        reset();
    }

    // function untuk delete data
    async function hapus(id) {
        if (window.confirm('Yakin ingin menghapus kategori ini?')) {
            const res = await link.delete('/kategori/' + id);

            setPesan(res.data.pesan);
        }

        
    }

    // function untuk show data
    async function showData(id) {
        const res = await link.get('/kategori/' + id);

        setValue('kategori', res.data[0].kategori);
        setValue('keterangan', res.data[0].keterangan);

        setIdkategori(res.data[0].idkategori);
        setPilihan(false);
    }


    let no = 1;
    let title;
    let buttonName;

    // untuk mengubah title form
    if (pilihan) {
        title = 'Insert Kategori';
    } else {
        title = 'Update Kategori';
    }

    //untuk mengubah nama button submit
    if (pilihan) {
        buttonName = 'Submit';
    } else {
        buttonName = 'Update';
    }


    return (
        <div>
            <div className="row">
                <h2 className='mb-4'>Data Kategori</h2>
                <hr />
            </div>
            <div className="row">
                <h4>{title}</h4>
                <div className='col-5'>
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3 mt-1">
                            <label htmlFor="kategori" className="form-label">Kategori</label>
                            <input 
                                type="text"
                                className="form-control" 
                                name='kategori' 
                                placeholder="Nama Kategori"
                                {...register('kategori', {required: true})} />
                                <h6>{errors.kategori && "*Kategori Harus Diisi"}</h6>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="keterangan" className="form-label">Keterangan</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name='keterangan' 
                                placeholder="Isi Keterangan"
                                {...register('keterangan', {required: true})} />
                                <h6>{errors.keterangan && "*Keterangan Harus Diisi"}</h6>
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" name='submit' value={buttonName}  />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <h4 className='mb-4'><i>{pesan}</i></h4>
                <hr />
            </div>
            <div className="row">
                <table className='table'>
                    <thead>
                        <tr>
                            <th><h5>No.</h5></th>
                            <th><h5>Kategori</h5></th>
                            <th><h5>Keterangan</h5></th>
                            <th><h5>Delete</h5></th>
                            <th><h5>Update</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isi.map((val, index) => (
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.kategori}</td>
                                    <td>{val.keterangan}</td>
                                    <td>
                                        <button onClick={ () => hapus(val.idkategori)} className='btn btn-danger'>Delete</button>
                                    </td>
                                    <td>
                                        <button onClick={ () => showData(val.idkategori)} className='btn btn-primary'>Update</button>
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

export default Kategori;
