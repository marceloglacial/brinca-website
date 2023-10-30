'use client'
import { FC } from 'react'
import { Link, NavBar } from '@marceloglacial/brinca-ui'
import Image from 'next/image'

const PageFooter: FC = () => {
    return (
        <NavBar variant='bottom'>
            <NavBar.Brand>
                <a href='#'>
                    <Image
                        alt=''
                        width={150}
                        height={60}
                        className='w-[150px] h-[60px] object-contain'
                        src='https://res.cloudinary.com/brinca/image/upload/v1664060777/brinca-ui/image_yfpt9t.png'
                    />
                </a>
            </NavBar.Brand>
            <NavBar.Items variant='bottom'>
                <Link variant='white'>
                    <a href='#'>Item</a>
                </Link>
                <Link variant='white'>
                    <a href='#'>Item</a>
                </Link>
                <Link variant='white'>
                    <a href='#'>Item</a>
                </Link>
                <Link variant='white'>
                    <a href='#'>Item</a>
                </Link>
                <Link variant='white'>
                    <a href='#'>Item</a>
                </Link>
            </NavBar.Items>
        </NavBar>
    )
}
export default PageFooter
