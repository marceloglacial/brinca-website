'use client'

import { DICTIONARY } from '@/constants'
import { useParams } from 'next/navigation'

const CategoryListTitle: React.FC = () => {
  const params = useParams()
  const locale = params.locale as keyof typeof DICTIONARY.CATEGORIES
  const title = DICTIONARY.CATEGORIES[locale]

  return <h4 className='partners-list-categories__title'>{title}</h4>
}

export default CategoryListTitle
