export const Sponsors = async () => {
  const sponsorsGold = [
    {
      src: 'https://res.cloudinary.com/brinca/image/upload/v1774004219/sponsors/2026/eldo_bwbq2a.png',
      alt: 'Eldo Santos',
    },
    {
      src: 'https://res.cloudinary.com/brinca/image/upload/v1774004220/sponsors/2026/horizons_pktsuv.png',
      alt: 'Horizons Dental Care',
    },
    {
      src: 'https://res.cloudinary.com/brinca/image/upload/v1774004221/sponsors/2026/taxes_ohfaim.png',
      alt: 'Tax Para Brasileiros',
    },
  ]

  const sponsorsSilver = [
    {
      src: 'https://res.cloudinary.com/brinca/image/upload/v1774005084/sponsors/2026/sabino_dp9jj7.png',
      alt: 'Sabino Insurance',
    },
    {
      src: 'https://res.cloudinary.com/brinca/image/upload/v1774005076/sponsors/2026/bea_z2kvpz.png',
      alt: 'Bea Teixeira Realtor',
    },
    {
      src: 'https://res.cloudinary.com/brinca/image/upload/v1774005077/sponsors/2026/britannia_ob5vol.png',
      alt: 'Britannia Village Dental Care',
    },
    {
      src: 'https://res.cloudinary.com/brinca/image/upload/v1774005083/sponsors/2026/mario_i1gkuw.png',
      alt: 'Mario Food Centre',
    },
  ]

  const sponsorsBronze = [
    {
      src: 'https://res.cloudinary.com/brinca/image/upload/v1774005082/sponsors/2026/kw_nh9nku.png',
      alt: 'Ottawa Brazil Real Estate',
    },
  ]
  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto flex flex-col gap-2'>
        <div className='text-2xl font-bold'>2026 Sponsors</div>
        <div className='mb-4 border-b-1 border-gray-200 pb-4'>
          <div className='text-xl font-bold text-yellow-600'>Diamond</div>
          <div className='flex flex-wrap gap-4 md:gap-24'>
            {sponsorsGold.map((sponsor) => (
              <img
                key={sponsor.src}
                src={sponsor.src}
                alt={sponsor.alt}
                className='h-14 object-contain md:h-28'
              />
            ))}
          </div>
        </div>

        <div className='mb-4 border-b-1 border-gray-200 pb-4'>
          <div className='text-xl font-bold text-gray-600'>Silver Premium</div>
          <div className='flex flex-wrap gap-4 md:gap-24'>
            {sponsorsSilver.map((sponsor) => (
              <img
                key={sponsor.src}
                src={sponsor.src}
                alt={sponsor.alt}
                className='h-14 object-contain md:h-28'
              />
            ))}
          </div>
        </div>

        <div>
          <div className='text-xl font-bold text-yellow-900'>Bronze Essential</div>
          <div className='flex flex-wrap gap-4 md:gap-24'>
            {sponsorsBronze.map((sponsor) => (
              <img
                key={sponsor.src}
                src={sponsor.src}
                alt={sponsor.alt}
                className='h-14 object-contain md:h-28'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
