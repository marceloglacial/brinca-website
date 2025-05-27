import { COLLECTIONS, DICTIONARY } from '@/constants'
import { FC } from 'react'
import CategoryListMenu from './CategoryListMenu'
import PartnersSection from './PartnersSection'
import { getAllByCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'

export const PartnersList: FC<PartnersListProps> = async ({ locale, category }) => {
  const response = await getAllByCollection(COLLECTIONS.PARTNERS, {
    locale,
    sortBy: 'title',
  })

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    return <>Error</>
  }

  const partners = (response.data as PartnerTypeLocalized[]).filter((partner) => {
    if (!category) return true
    return partner.category === category.id
  })

  return (
    <div className='partners-list grid grid-cols-1 gap-16 pt-8'>
      <CategoryListMenu locale={locale} />
      <PartnersSection content={partners} title={DICTIONARY.PARTNERS} />
    </div>
  )
}
