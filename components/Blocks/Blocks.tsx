// TODO fix typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Block } from 'components'
import { FC } from 'react'
import { SpacingTypes } from 'types'

export interface BlocksProps {
    blocks: any[]
    spacing?: SpacingTypes
}

const Blocks: FC<BlocksProps> = ({ blocks, spacing = 'none' }) => {
    return (
        <div className={`${styles.container} ${styles[spacing]}`}>
            {blocks?.map((block, index) => (
                <Block key={index} id={index} {...block} />
            ))}
        </div>
    )
}

export default Blocks

const styles = {
    container: `flex flex-col`,
    none: '',
    md: `gap-3 lg:gap-6`,
    sm: `gap-6 lg:gap-12`,
    lg: `gap-12 lg:gap-24`,
}
