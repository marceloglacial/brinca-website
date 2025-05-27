'use client'

import { FC } from 'react'
import PartnersListItem from './PartnersListItem'

const PartnersListItems: FC<{ data: CategoryType[] }> = (props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <PartnersListItem key={index} {...item} />
      ))}
    </>
  )
}

export default PartnersListItems
