import { DICTIONARY } from '@/constants'
import { getPartners } from '@/lib'
import { FC } from 'react'
import PartnersListMenu from './PartnersListMenu'
import PartnersSection from './PartnersSection'

export const PartnersList: FC<PartnersListProps> = async (props) => {
  const members = await getPartners({ category: props.category })
  const community = await getPartners({
    type: 'community',
    category: props.category,
  })

  if ([members, community].some(({ status }) => status === 'error')) {
    console.debug(members.message)
    return <>Error</>
  }

  return (
    <div className='partners-list pt-8 grid grid-cols-1 gap-16'>
      <PartnersListMenu />
      <PartnersSection content={members.data} title={DICTIONARY.PARTNERS} />
      <PartnersSection content={community.data} title={DICTIONARY.COMMUNITY} />
    </div>
  )
}
