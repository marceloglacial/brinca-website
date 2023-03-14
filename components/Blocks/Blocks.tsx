// TODO fix typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Block } from 'components'
import { FC } from 'react'
import { SpacingTypes } from 'types'
import styles from './BlocksStyles'

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
