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
        isActive: false,
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

];
