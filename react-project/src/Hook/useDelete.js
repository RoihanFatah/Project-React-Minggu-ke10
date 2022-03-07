import { link } from "../Axios/link";
import { useState } from "react";

const useDelete = (url) => {

    const [pesan, setPesan] = useState('');

    async function hapus(id) {
        if (window.confirm('Yakin ingin menghapus pelanggan ini?')) {
            const res = await link.delete(url + id);

            setPesan(res.data.pesan);
        }
    }

    return {hapus, pesan, setPesan};
}

export default useDelete;
