import api from "./getPijama";


export async function getPijamas(){
    const response = await api.get("http://localhost:3333/pajamas/")
    return response.data.pajamas
}

export async function getProductById(id: string){
    const response = await api.get(`http://localhost:3333/pajamas/${id}`)
    return response.data.pajamas
}