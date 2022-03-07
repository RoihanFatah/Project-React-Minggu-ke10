import useGet from '../Hook/useGet';
import useDelete from '../Hook/useDelete';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { link } from '../Axios/link';


const Menu = () => {

    const [isi] = useGet('/menu');
    const {hapus, pesan, setPesan} = useDelete('/menu/');
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm();
    const [kategori, setKategori] = useState([]);
    const [gambar, setGambar] = useState([]);
    const [idkategori, setIdkategori] = useState([]);
    const [pilihan, setPilihan] = useState(true);
    const [idmenu, setIdmenu] = useState('');

    useEffect(() => {
        
        let ambil = true;

        async function fetchData() {
            const res = await link.get('/kategori');

            if (ambil) {
                setKategori(res.data);
            }
        }

        fetchData();

        return () => {
            ambil = false;
        };
    }, [kategori]);

    function simpan(data) {

        const formData = new FormData();

        formData.append('idkategori', data.idkategori);
        formData.append('menu', data.menu);
        formData.append('gambar', data.gambar[0]);
        formData.append('harga', data.harga);

        if (pilihan) {
            link.post('/menu', formData).then(res => setPesan(res.data.pesan));

        } else {
            link.post('/menu/' + idmenu, formData).then(res => setPesan(res.data.pesan));
            setPilihan(true);
        }

        

        reset();
    }

    async function showData(id) {
        const res = await link.get('/menu/' + id);

        setValue('menu', res.data[0].menu);
        setValue('harga', res.data[0].harga);

        // untuk mengambil gambar dari function show di api-lumen
        setGambar(<img src={res.data[0].gambar} height="200" width="260" alt="gambar menu" className='ms-5'/>);

        // untuk mengambil idkategori dari  function show di api-lumen, lalu menampilkannya di select-option
        setIdkategori(res.data[0].idkategori);

        //
        setIdmenu(res.data[0].idmenu);
        setPilihan(false);
    }

    let no = 1;
    let buttonName;
    let title;

    if (pilihan) {
        title = 'Insert Menu';
    } else {
        title = 'Update Menu';
    }

    if (pilihan) {
        buttonName = 'Submit';
    } else {
        buttonName = 'Update';
    }

    return (
        <div>
            <div className="row">
                <h2 className='mb-4'>Data Menu</h2>
                <hr />
            </div>
            <div className="row" id='insert-menu'>
                <h4>{title}</h4>
                <div className='col-5'>
                    <form onSubmit={handleSubmit(simpan)}>
                    <div className="mb-3">
                            <label htmlFor="kategori" className="form-label">Kategori</label>
                            <select 
                                name="idkategori" 
                                className='form-control'
                                {...register('idkategori', {required: true})}>

                                {kategori.map((val, index) => 
                                    val.idkategori === idkategori ? (
                                    <option key={index} selected value={val.idkategori}>
                                        {val.kategori}
                                    </option> 
                                    ) : (
                                    <option key={index} value={val.idkategori}>
                                        {val.kategori}
                                    </option>
                                    )
                                )}
                            </select>
                                <h6>{errors.kategori && "*Gambar Harus Diisi"}</h6>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="menu" className="form-label">Menu</label>
                            <input 
                                type="text"
                                className="form-control" 
                                name='menu' 
                                placeholder="Nama Menu"
                                {...register('menu', {required: true})} />
                                <h6>{errors.menu && "*Menu Harus Diisi"}</h6>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="harga" className="form-label">Harga</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name='harga' 
                                placeholder="Isi Harga"
                                {...register('harga', {required: true})} />
                                <h6>{errors.harga && "*Harga Harus Diisi"}</h6>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gambar" className="form-label">Gambar</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                name='gambar' 
                                {...register('gambar', {required:null})} />
                                <h6>{errors.gambar && "*Gambar Harus Diisi"}</h6>
                        </div>
                        <div className="mb-3">
                            <input 
                                type="submit" 
                                className="btn btn-primary mb-3" 
                                name='submit' 
                                value={buttonName}  />
                        </div>
                    </form>
                </div>
                <hr />
                <div className="col-5">
                    {gambar}
                </div>
            </div>
            <div className="row">
                <h4 className='mb-4'><i>{pesan}</i></h4>
            </div>
            <div className="row">
                <table className='table' id='table-section'>
                    <thead>
                        <tr>
                            <th><h5>No.</h5></th>
                            <th><h5>Kategori</h5></th>
                            <th><h5>Menu</h5></th>
                            <th><h5>Gambar</h5></th>
                            <th><h5>Harga</h5></th>
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
                                    <td>{val.menu}</td>
                                    <td><img src={val.gambar} height="100" width="160" alt="" /></td>
                                    <td>{val.harga}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => hapus(val.idmenu)}>Delete</button>
                                    </td>
                                    <td>
                                        <a href="#insert-menu"><button className='btn btn-primary' onClick={() => showData(val.idmenu)}>Update</button></a>
                                        
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

export default Menu;
