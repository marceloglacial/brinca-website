'use client'

import { FC } from 'react'
import CategoryListItem from './CategoryListItem'

const PartnersListItems: FC<{ data: CategoryType[] }> = (props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <CategoryListItem key={index} {...item} />
      ))}
    </>
  )
}

export default PartnersListItems
