import { Heading } from '@/components/ui'
import { FC, PropsWithChildren } from 'react'

export const FormTitle: FC<PropsWithChildren> = (props) => {
  return (
    <Heading>
      <h2>{props.children}</h2>
    </Heading>
  )
}
