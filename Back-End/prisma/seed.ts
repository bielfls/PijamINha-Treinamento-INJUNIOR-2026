import { prisma } from "@/libs/prisma.js"

async function seed() {
  console.log('Iniciando o seed do banco de dados...')

  const pajamasToCreate = [
      {
        id: 1,
        "name": "Pijama Aurora 1",
        "description": "Combinação perfeita entre conforto e beleza.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 154.27,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Família",
        "favorite": true,
        "onSale": false,
        "salePercent": null
    },
    {
        id: 2,
        "name": "Pijama Lua Serena 2",
        "description": "Produzido com material de alta qualidade.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 166.15,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Família",
        "favorite": true,
        "onSale": true,
        "salePercent": 10
    },
    {
        id: 3,
        "name": "Pijama Aurora 3",
        "description": "Design moderno com excelente acabamento.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 222.37,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Família",
        "favorite": false,
        "onSale": false
    },
    {
        id: 4,
        "name": "Pijama Lua Serena 4",
        "description": "Extremamente confortável e ideal para boas noites de sono.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 81.4,
        "season": "Verão",
        "type": "Infantil",
        "gender": "Unissex",
        "favorite": true,
        "onSale": false
    },
    {
        id: 5,
        "name": "Pijama Inverno Quentinho 5",
        "description": "Modelo pensado para máximo conforto térmico.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 175.53,
        "season": "Inverno",
        "type": "Adulto",
        "gender": "Masculino",
        "favorite": false,
        "onSale": false
    },
    {
        id: 6,
        "name": "Pijama Mundo dos Sonhos 6",
        "description": "Modelo pensado para máximo conforto térmico.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 99.51,
        "season": "Verão",
        "type": "Adulto",
        "gender": "Unissex",
        "favorite": true,
        "onSale": false
    },
    {
        id: 7,
        "name": "Pijama Mundo dos Sonhos 7",
        "description": "Combinação perfeita entre conforto e beleza.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 94.67,
        "season": "Verão",
        "type": "Adulto",
        "gender": "Masculino",
        "favorite": true,
        "onSale": true,
        "salePercent": 5
    },
    {
        id: 8,
        "name": "Pijama Verão Radiante 8",
        "description": "Perfeito para quem busca conforto e estilo.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 97.03,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Masculino",
        "favorite": true,
        "onSale": true,
        "salePercent": 30
    },
    {
        id: 9,
        "name": "Pijama Conforto Total 9",
        "description": "Combinação perfeita entre conforto e beleza.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 174.24,
        "season": "Inverno",
        "type": "Adulto",
        "gender": "Feminino",
        "favorite": true,
        "onSale": true,
        "salePercent": 10
    },
    {
        id: 10,
        "name": "Pijama Toque de Seda 10",
        "description": "Extremamente confortável e ideal para boas noites de sono.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 125.65,
        "season": "Inverno",
        "type": "Adulto",
        "gender": "Unissex",
        "favorite": true,
        "onSale": false,
        "salePercent": null
    },
    {
        id: 11,
        "name": "Pijama Carinho Macio 11",
        "description": "Estampa delicada e tecido agradável ao toque.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 154.49,
        "season": "Verão",
        "type": "Adulto",
        "gender": "Feminino",
        "favorite": false,
        "onSale": false,
        "salePercent": null
    },
    {
        id: 12,
        "name": "Pijama Aurora 12",
        "description": "Tecido suave que proporciona liberdade de movimento.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 149.52,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Feminino",
        "favorite": false,
        "onSale": false,
        "salePercent": null
    },
    {
        id: 13,
        "name": "Pijama Mundo dos Sonhos 13",
        "description": "Ideal para noites aconchegantes em casa.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 204.61,
        "season": "Verão",
        "type": "Adulto",
        "gender": "Feminino",
        "favorite": false,
        "onSale": true,
        "salePercent": 25
    },
    {
        id: 14,
        "name": "Pijama Doce Sonho 14",
        "description": "Combinação perfeita entre conforto e beleza.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 125.26,
        "season": "Verão",
        "type": "Infantil",
        "gender": "Masculino",
        "favorite": false,
        "onSale": false,
        "salePercent": null
    },
    {
        id: 15,
        "name": "Pijama Noite Feliz 15",
        "description": "Tecido suave que proporciona liberdade de movimento.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 179.7,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Feminino",
        "favorite": false,
        "onSale": false
    },
    {
        id: 16,
        "name": "Pijama Verão Radiante 16",
        "description": "Modelo pensado para máximo conforto térmico.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 149.61,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Unissex",
        "favorite": true,
        "onSale": true,
        "salePercent": 10
    },
    {
        id: 17,
        "name": "Pijama Aurora 17",
        "description": "Extremamente confortável e ideal para boas noites de sono.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 152.29,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Feminino",
        "favorite": false,
        "onSale": false
    },
    {
        id: 18,
        "name": "Pijama Toque de Seda 18",
        "description": "Ideal para noites aconchegantes em casa.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 183.7,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Feminino",
        "favorite": true,
        "onSale": true,
        "salePercent": 10
    },
    {
        id: 19,
        "name": "Pijama Galáxia Kids 19",
        "description": "Tecido suave que proporciona liberdade de movimento.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 82.35,
        "season": "Verão",
        "type": "Infantil",
        "gender": "Masculino",
        "favorite": false,
        "onSale": false
    },
    {
        id: 20,
        "name": "Pijama Toque de Seda 20",
        "description": "Perfeito para quem busca conforto e estilo.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 175.13,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Unissex",
        "favorite": true,
        "onSale": false
    },
    {
        id: 21,
        "name": "Pijama Verão Radiante 21",
        "description": "Design moderno com excelente acabamento.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 167.42,
        "season": "Inverno",
        "type": "Adulto",
        "gender": "Masculino",
        "favorite": true,
        "onSale": false,
        "salePercent": null
    },
    {
        id: 22,
        "name": "Pijama Encanto Azul 22",
        "description": "Ideal para noites aconchegantes em casa.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 177.5,
        "season": "Inverno",
        "type": "Infantil",
        "gender": "Unissex",
        "favorite": true,
        "onSale": false,
        "salePercent": null
    },
    {
        id: 23,
        "name": "Pijama Conforto Total 23",
        "description": "Modelo pensado para máximo conforto térmico.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 134.77,
        "season": "Verão",
        "type": "Infantil",
        "gender": "Masculino",
        "favorite": false,
        "onSale": false
    },
    {
        id: 24,
        "name": "Pijama Noite Feliz 24",
        "description": "Estampa delicada e tecido agradável ao toque.",
        "image": "https://photo-cdn2.icons8.com/Rtr0AOV_KRqY4U2nPbGej1lDC2sPRYvYN3OQLLTcmxk/rs:fit:715:1072/wm:1:re:0:0:0.65/wmid:moose/q:98/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5h/c3NldHMvYXNzZXRz/L3NhdGEvb3JpZ2lu/YWwvMzk0LzMyM2Vh/NzA3LTRkMWMtNDVj/My1iM2I0LTNiOWMz/NjMyNDBiNy5qcGc.jpg",
        "price": 178.38,
        "season": "Verão",
        "type": "Adulto",
        "gender": "Unissex",
        "favorite": true,
        "onSale": true,
        "salePercent": 30
    }
  ]

  for (const pajama of pajamasToCreate) {
    const { id, ...pajamaData } = pajama

    await prisma.pajamas.upsert({
      where: { 
        id: id 
      },
      update: {
        ...pajamaData
      },
      create: {
        id: id,
        ...pajamaData,
        sizes: {
          create: [
            { size: 'PP', stockQuantity: 5 },
            { size: 'P', stockQuantity: 15 },
            { size: 'M', stockQuantity: 25 },
            { size: 'G', stockQuantity: 20 },
            { size: 'GG', stockQuantity: 10 },
          ]
        }
      }
    })
  }

  console.log('Seeding completed successfully.')
}

seed()
  .then(() => {
    prisma.$disconnect()
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error during seeding:', error)
    prisma.$disconnect()
    process.exit(1)
  })