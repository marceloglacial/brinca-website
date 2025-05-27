import { Alert } from '@/components'
import { COLLECTIONS, DICTIONARY, ROUTES } from '@/constants'
import { FC } from 'react'
import PartnerListTitle from './PartnerListTitle'
import CategoryListItem from './CategoryListItem'
import PartnersListItems from './PartnersListItems'
import { getAllByCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'

const PartnersListMenu: FC<{ locale: LocalesType }> = async ({ locale }) => {
  const response = await getAllByCollection(COLLECTIONS.CATEGORIES, { locale, sortBy: 'title' })

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    return <Alert message={'Error loading categories!'} />
  }

  const categories = response.data as CategoryType[]
  if (!categories.length) return <></>

  return (
    <div className='partners-list-categories flex flex-col gap-4'>
      <PartnerListTitle />
      <div className='partners-list-categories__menu flex flex-wrap gap-4'>
        <CategoryListItem
          title={DICTIONARY.ALL[locale]}
          slug={ROUTES.PARTNERS_ALL[locale]}
          id={'0'}
        />
        <PartnersListItems data={categories} />
      </div>
    </div>
  )
}

export default PartnersListMenu
