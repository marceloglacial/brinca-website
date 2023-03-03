import { Link, NavBar } from '@marceloglacial/brinca-ui'
import Image from 'next/image'

const PageHeader = () => (
    <NavBar>
        <NavBar.Brand>
            <a href='#'>
                <div className='w-[160px] h-[65px] md:w-[230px] md:h-[95px] object-contain relative'>
                    <Image
                        src='https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png'
                        alt=''
                        fill
                    />
                </div>
            </a>
        </NavBar.Brand>
        <NavBar.Items>
            <Link>
                <a href='#'>Item 1</a>
            </Link>
            <Link>
                <a href='#'>Item 2</a>
            </Link>
            <Link>
                <a href='#'>Item 3</a>
            </Link>
            <Link>
                <a href='#'>Item 4</a>
            </Link>
            <Link>
                <a href='#'>Item 5</a>
            </Link>
            <Link>
                <a href='#'>Item 6</a>
            </Link>
            <Link variant='primary'>
                <a href='#'>Item 7</a>
            </Link>
        </NavBar.Items>
    </NavBar>
)
export default PageHeader
