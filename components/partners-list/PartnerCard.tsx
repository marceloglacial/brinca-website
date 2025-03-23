'use client'
import { Animation, Icon } from '@/components'
import { localizedContent } from '@/utils'
import { Card } from '@/components/ui'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FC } from 'react'

const PartnerCard: FC<PartnerTypeLocalized> = (props) => {
  const params = useParams()
  const content: PartnerType = localizedContent(props, params.locale as string)
  const showLogo = content.logo && (content.membership_email?.length ?? 0) > 1

  return (
    <Animation>
      <Card>
        <Card.Body className='text-center lg:text-left'>
          <div className='flex flex-wrap justify-center gap-4 lg:flex-nowrap lg:justify-start'>
            {showLogo && (
              <figure className='relative aspect-square h-[200px] w-auto md:h-[100px]'>
                <Image
                  alt={content.title}
                  src={content.logo}
                  sizes='200px 200px'
                  fill
                  className='object-contain'
                />
              </figure>
            )}
            <div className='w-full text-center md:text-left'>
              <h4 className='text-[20px]'>{content.title}</h4>
              {content.description && (
                <p className='text-[1rem] leading-normal'>{content.description}</p>
              )}
            </div>
          </div>
          <div className='w-full text-center md:text-left'>
            <address>
              <div>{content.address}</div>
              {content.website && (
                <div>
                  <a href={content.website} target='_blank' rel='noreferrer'>
                    {content.website}
                  </a>
                </div>
              )}
              <div>
                <a href={`mailto:${content.email}`}>{content.email}</a>
              </div>
              {content.phone && (
                <div>
                  <a href={`tel:${content.phone}`}>{content.phone}</a>
                </div>
              )}
            </address>
          </div>
          <div className='flex w-full justify-center gap-4 lg:justify-start'>
            {content.whatsapp && (
              <a
                href={`https://wa.me/${content.whatsapp}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icon type={'whatsapp'} />
              </a>
            )}
            {content.facebook && (
              <a href={content.facebook} target='_blank' rel='noreferrer'>
                <Icon type={'facebook'} />
              </a>
            )}
            {content.instagram && (
              <a href={content.instagram} target='_blank' rel='noreferrer'>
                <Icon type={'instagram'} />
              </a>
            )}
            {content.linkedin && (
              <a href={content.linkedin} target='_blank' rel='noreferrer'>
                <Icon type={'linkedin'} />
              </a>
            )}
          </div>
        </Card.Body>
      </Card>
    </Animation>
  )
}
export default PartnerCard
