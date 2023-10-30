'use client'
import { FC } from 'react'
import { Link, NavBar } from '@marceloglacial/brinca-ui'
import Image from 'next/image'

const PageHeader: FC = () => {
    return (
        <NavBar>
            <NavBar.Brand>
                <a href='#'>
                    <Image
                        alt=''
                        width={160}
                        height={65}
                        className='w-[160px] h-[65px] md:w-[230px] md:h-[95px] object-contain'
                        src='https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png'
                    />
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
}

export default PageHeader
