export const partnersCategories: PartnerCategoryType[] = [
    {
        id: '0',
        title: {
            en: 'Food',
            'pt-BR': 'Alimentação',
        },
        slug: {
            en: 'food',
            'pt-BR': 'alimentacao',
        },
    },
    {
        id: '1',
        title: {
            en: 'Banks and Insurance',
            'pt-BR': 'Bancos e Seguros',
        },
        slug: {
            en: 'bancos-e-seguros',
            'pt-BR': 'banks-and-insurance',
        },
    },
    {
        id: '2',
        title: { en: 'Hair', 'pt-BR': 'Cabelo, Estética e Cuidados Pessoais' },
        slug: { en: 'hair', 'pt-BR': 'cabelo-estetica-e-cuidados-pessoais' }
    }
];


export const partners: PartnerType[] = [
    {
        id: '0',
        title: {
            en: 'AKAÍ Bowl',
            'pt-BR': 'AKAÍ Bowl',
        },
        description: {
            en: 'Descriptiont in English',
            'pt-BR': 'Preparamos taças de açaí e smoothies. AÇAÍ é uma fruta nativa do Brasil, famosa por seu alto valor nutricional e benefícios gerais para a saúde.',
        },
        email: 'contactus@akaibowl.ca',
        address: 'Bayshore Shopping Centre, 100 Bayshore Drive - Level 2, Ottawa.',
        website: 'http://www.akaibowl.ca/',
        phone: '(613) 614-8156',
        social: [
            {
                type: 'instagram',
                url: 'https://instagram.com/Akai.Bowl',
            },
            {
                type: 'facebook',
                url: 'https://facebook.com/Akai.Bowl',
            },
            {
                type: 'whatsapp',
                url: 'https://wa.me/+16136148156',
            },
        ],
        isActive: true,
        type: 'partner',
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        image: {
            src: 'https://res.cloudinary.com/dw2wjwhuv/image/upload/v1653361963/brinca/partners/PART-018_dx1t5g.png',
            alt: 'Logo'
        },
        category: [
            {
                id: '0',
                title: {
                    en: 'Food',
                    'pt-BR': 'Alimentação',
                },
                slug: {
                    en: 'food',
                    'pt-BR': 'alimentacao',
                },
            },
        ]
    },
    {
        id: '1',
        title: {
            en: 'Twelvem Acupuncture',
            'pt-BR': 'Twelvem Acupuncture',
        },
        description: {
            en: 'Descriptiont in English',
            'pt-BR': 'Acupuntura e Massagens no tratamento da dor, saude da mulher, fertilidade e gestação, insônia, digestão, enxaqueca, ansiedade e stress, entre outros.',
        },
        email: 'jocelito@twelvem.ca',
        address: '1090, Ambleside Drive, sala 124, Ottawa',
        website: 'http://www.twelvem.ca',
        phone: '(343) 988-4427',
        social: [
            {
                type: 'instagram',
                url: 'https://instagram.com/twelvemacupuncture',
            },
            {
                type: 'facebook',
                url: 'https://facebook.com/twelvemacupuncture',
            },
            {
                type: 'whatsapp',
                url: 'https://wa.me/+3439884427',
            },
        ],
        isActive: true,
        type: 'partner',
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        image: {
            src: 'https://res.cloudinary.com/dw2wjwhuv/image/upload/v1654776571/brinca/partners/ujotudwx8fhkbwfnmnu5.png',
            alt: 'Logo'
        },
        category: [
            {
                id: '1',
                title: {
                    en: 'Banks and Insurance',
                    'pt-BR': 'Bancos e Seguros',
                },
                slug: {
                    en: 'bancos-e-seguros',
                    'pt-BR': 'banks-and-insurance',
                },
            },
        ]
    },
    {
        id: '2',
        isActive: true,
        type: 'community',
        title: {
            en: 'Mommy Owl - Gift Shop',
            'pt-BR': 'Mommy Owl - Gift Shop',
        },
        description: {
            en: 'Descriptiont in English',
            'pt-BR': 'Acupuntura e Massagens no tratamento da dor, saude da mulher, fertilidade e gestação, insônia, digestão, enxaqueca, ansiedade e stress, entre outros.',
        },
        phone: '(343)987-1331',
        website: 'http://www.mommyowl.ca',
        email: 'contact@mommyowl.ca',
        social: [],
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        image: {
            src: 'https://res.cloudinary.com/dw2wjwhuv/image/upload/v1652878239/brinca/partners/06_s1sjdj.png',
            alt: 'Logo'
        },
        category: [
            {
                id: '0',
                title: {
                    en: 'Food',
                    'pt-BR': 'Alimentação',
                },
                slug: {
                    en: 'food',
                    'pt-BR': 'alimentacao',
                },
            },
        ]
    },
];
