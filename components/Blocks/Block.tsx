/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hero } from 'components'
import { FC } from 'react'

// TODO: Fix types

const Block: FC = (props: any): JSX.Element => {
    const blockType: any = {
        hero: <Hero {...props} reversed={!(props.id % 2)} />,
    }
    return <div data-aos='fade-up'>{blockType[props.type]}</div>
}

export default Block
