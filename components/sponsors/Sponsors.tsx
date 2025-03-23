import { Alert } from '@/components'
import { COLLECTIONS } from '@/constants'
import { getPageDataBySlug } from '@/lib'
import Image from 'next/image'
import { FC } from 'react'

export const Sponsors: FC<SponsorsProps> = async (props) => {
  if (!props.data.active) return <></>

  const result = await getPageDataBySlug(COLLECTIONS.SPONSORS, props.locale, 'title', 'asc')

  if (result.status === 'error') return <Alert message={result.message} />

  const sponsors = result.data as SponsorType[]

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-lg font-bold'>{props.data.title}</div>
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
