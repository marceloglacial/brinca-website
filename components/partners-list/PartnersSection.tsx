'use client'
import { useParams } from 'next/navigation'
import { FC } from 'react'
import PartnerCard from './PartnerCard'

const PartnersSection: FC<PartnersSectionProps> = (props) => {
  const params = useParams()
  const locale = params.locale as LocalesType

  if (!props.content.length) return <></>

  return (
    <div className='grid grid-cols-1 gap-8'>
      <h4>{props.title[locale]}</h4>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {props.content.map((item) => (
          <PartnerCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default PartnersSection
