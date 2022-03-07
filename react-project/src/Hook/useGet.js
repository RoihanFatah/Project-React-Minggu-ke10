import {useState, useEffect} from 'react';
import {link} from '../Axios/link';

const useGet = (url) => {

    // Section useState untuk mengambil data dari apirestoran lalu dimasukkan ke variabel isi
    const [isi, setIsi] = useState([]);

    useEffect(() => {
        
        let ambil = true;

        async function fetchData() {
            const res = await link.get(url);

            if (ambil) {
                setIsi(res.data);
            }
        }

        fetchData();

        return () => {
            ambil = false;
        };
    }, [isi]);

    return [isi];
}

export default useGet;

