'use client'

import { DICTIONARY } from '@/constants'
import { useParams } from 'next/navigation'

const CategoryListTitle: React.FC = () => {
  const { locale } = useParams<{ locale: LocalesType }>()
  const title = DICTIONARY.CATEGORIES[locale]

  return <h4 className='partners-list-categories__title'>{title}</h4>
}

export default CategoryListTitle
