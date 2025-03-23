import React, { useState } from 'react'
import { Link, NavBar } from '..'

export default {
  title: 'Components/NavBar',
  component: NavBar,
}

export const Top = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <NavBar {...props}>
      <NavBar.Brand>
        <a href='#'>
          <img
            src='https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png'
            alt=''
            className='h-[65px] w-[160px] object-contain md:h-[95px] md:w-[230px]'
          />
        </a>
      </NavBar.Brand>
      <NavBar.Items isOpen={isOpen}>
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
      <NavBar.Button isOpen={isOpen} setIsOpen={setIsOpen} />
    </NavBar>
  )
}
export const Bottom = (props) => {
  return (
    <NavBar variant='bottom' {...props}>
      <NavBar.Brand>
        <a href='#'>
          <img
            src='https://res.cloudinary.com/brinca/image/upload/v1664060777/brinca-ui/image_yfpt9t.png'
            alt=''
            className='h-[60px] w-[150px] object-contain'
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
