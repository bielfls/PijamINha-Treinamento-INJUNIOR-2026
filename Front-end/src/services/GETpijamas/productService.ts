import api from "./getPijama";


export async function getPijamas(gender?: string, season?: string, type?: string){
    const response = await api.get("http://localhost:3333/pajamas/", {
        params:{
            gender: gender === "Gênero" ? undefined : gender,
            season: season ==="Estação" ? undefined : season,
            type: type === "Tipo" ? undefined : type
        }
    })

    return response.data.pajamas
}

export async function getProductById(id: string){
    const response = await api.get(`http://localhost:3333/pajamas/${id}`)
    return response.data.pajamas
}