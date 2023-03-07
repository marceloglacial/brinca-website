import { Hero } from 'components'
import { FC } from 'react'

const Blocks: FC = (props: any): JSX.Element => {
    const blockType: any = {
        hero: <Hero {...props} />,
    }
    return <div data-aos='fade-up'>{blockType[props.type]}</div>
}
export default Blocks
