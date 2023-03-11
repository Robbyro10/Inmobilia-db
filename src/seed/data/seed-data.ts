import * as bcrypt from "bcrypt";

interface SeedProperty {
    address: string;
    description: string;
    rent?: number;
    sale?: number;
    bath: number;
    rooms: number;
    parking: number;
    size: number;
    terrain?: number;
    addOns: string;
    img: string[];
    type: string;
}

interface SeedUser {
    email: string;
    fullName: string;
    password: string; 
}

interface SeedData {
    properties: SeedProperty[];
    users: SeedUser[];
}

export const initialData: SeedData = {
    users: [
        {
            email: 'palaciosu@gmail.com',
            fullName: 'Ana Palacios',
            password: 'Abc123'
        },
        {
            email: 'jgh2748@gmail.com',
            fullName: 'Juan Hedderich',
            password: 'Abc123'
        },
    ],

    properties: [
        {
            "address": "el country",
            "description": "Mansion gotica y grande",
            "rent": 500,
            "sale": 500000,
            "bath": 6,
            "rooms": 6,
            "size": 550,
            "parking": 5,
            "addOns": "Jardin, piscina, gran cocina, estudio, seguridad",
            "img": [
                "https://res.cloudinary.com/dwdimx0pg/image/upload/v1677779257/inmobilia/daniel-barnes-RKdLlTyjm5g-unsplash_rg1hy9.jpg"
            ],
            "type": "Casa",
        },
        {
            "address": "altamira",
            "description": "Apartamento grande de dos pisos",
            "sale": 800000,
            "bath": 5,
            "rooms": 3,
            "size": 600,
            "parking": 3,
            "addOns": "Alta seguridad, remodelado, vista al Avila",
            "img": [
                "https://res.cloudinary.com/dwdimx0pg/image/upload/v1677779243/inmobilia/r-architecture-2gDwlIim3Uw-unsplash_azrvtm.jpg"
            ],
            "type": "Apartamento",
        },
        {
            "address": "la lagunita",
            "description": "Casa colonial con vista al club",
            "sale": 2000000,
            "bath": 7,
            "rooms": 6,
            "size": 700,
            "terrain": 1200,
            "parking": 5,
            "addOns": "Arquitectura colonial, gran salon, jardin gigante, fuente y grandes espacios sociales",
            "img": [
                "https://res.cloudinary.com/dwdimx0pg/image/upload/v1677779259/inmobilia/nick-romanov-_hw4aUQ81ic-unsplash_mdbic3.jpg"
            ],
            "type": "Casa",
        },
        {
            "address": "cerro verde",
            "description": "Casa blanca y moderna con piscina",
            "rent": 500,
            "bath": 4,
            "rooms": 4,
            "size": 700,
            "terrain": 900,
            "parking": 3,
            "addOns": "Piscina, gran zona social, seguridad, luz natural",
            "img": [
                "https://res.cloudinary.com/dwdimx0pg/image/upload/v1677779224/inmobilia/john-fornander-tVzyDSV84w8-unsplash_zmnpe3.jpg"
            ],
            "type": "Casa",
        },
        {
            "address": "los chorros",
            "description": "Casa colonial de arquitectura gotica",
            "rent": 500,
            "bath": 4,
            "rooms": 6,
            "size": 900,
            "terrain": 1200,
            "parking": 4,
            "addOns": "Seguridad, jardin, pozo de agua, planta electrica",
            "img": [
                "https://res.cloudinary.com/dwdimx0pg/image/upload/v1677779237/inmobilia/bartlomiej-balicki-7icYxbgI9qk-unsplash_nfwwif.jpg"
            ],
            "type": "Casa",
        },
        {
            "address": "altamira",
            "description": "Casa grande y espaciosa",
            "rent": 500,
            "sale": 500000,
            "bath": 4,
            "rooms": 6,
            "size": 900,
            "parking": 4,
            "addOns": "Seguridad, jardin, pozo de agua, planta electrica",
            "img": [
                "https://res.cloudinary.com/dwdimx0pg/image/upload/v1678329059/inmobilia/vsd2wst7mgkhoknen5wf.jpg",
                "https://res.cloudinary.com/dwdimx0pg/image/upload/v1678329114/inmobilia/byewaujtzzcnrmg6tqno.jpg",
                "https://res.cloudinary.com/dwdimx0pg/image/upload/v1678329169/inmobilia/ffikdoaglo1qkn3q3app.jpg",
                "https://res.cloudinary.com/dwdimx0pg/image/upload/v1678329163/inmobilia/kph8az2hjggnygmkhl3d.jpg"
            ],
            "type": "Casa",
        }
    ]
}