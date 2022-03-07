const url = "http://localhost:8000/api";
let token = "0zPuhfV3mEi0J5EkSj0MmqZSj9psnnBJTL9hxcIA";

        //mengambil data dari apirestoran melalui AXIOS
export const link = axios.create({
    baseURL : url,
    headers : {
        'api_token' : token
    }
});