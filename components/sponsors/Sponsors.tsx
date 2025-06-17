import { Alert } from '@/components'
import { COLLECTIONS } from '@/constants'
import { getAllByCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import Image from 'next/image'
import { FC } from 'react'

export const Sponsors: FC<SponsorsProps> = async ({ locale, data }) => {
  if (!data.active) return <></>

  const response = await getAllByCollection(COLLECTIONS.SPONSORS, { locale })

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST)
    return <Alert message={response.message} />

  const sponsors = response.data as SponsorType[]

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-lg font-bold'>{data.title}</div>
      <div className='flex flex-wrap justify-evenly gap-8'>
        {sponsors.map((sponsor, index) => {
          if (!sponsor.active) return
          return (
            <a
              key={index}
              href={sponsor.link}
              target='_blank'
              className='relative flex h-32 w-48'
              rel='noreferrer'
            >
              <Image
                src={sponsor.image}
                alt={'Sponsor logo'}
                fill
                sizes='150px, 60px'
                className='object-contain'
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}
