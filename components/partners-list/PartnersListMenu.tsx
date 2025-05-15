import { Alert } from '@/components'
import { DICTIONARY, ROUTES } from '@/constants'
import { FC } from 'react'
import PartnerListTitle from './PartenerListTitle'
import PartnersListItem from './PartnersListItem'
import PartnersListItems from './PartnersListItems'
import { HttpStatusSchema } from '@/schemas/api'
import { getCategories } from '@/lib/api'

const PartnersListMenu: FC<{ locale: LocalesType }> = async ({ locale }) => {
  const result = await getCategories(locale)

  if (result.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    return <Alert message={'Error loading categories!'} />
  }

  const categories = result.data as CategoryType[]
  if (!categories.length) return <></>

  return (
    <div className='partners-list-categories flex flex-col gap-4'>
      <PartnerListTitle />
      <div className='partners-list-categories__menu flex flex-wrap gap-4'>
        <PartnersListItem title={DICTIONARY.ALL} slug={ROUTES.PARTNERS_ALL} id={'0'} />
        <PartnersListItems data={categories} />
      </div>
    </div>
  )
}

export default PartnersListMenu
