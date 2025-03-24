'use client'
import * as motion from 'motion/react-client'
import { PropsWithChildren } from 'react'

export const Animation = (props: PropsWithChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { ease: 'easeIn', duration: 0.25 },
      }}
      viewport={{ once: true }}
    >
      {props.children}
    </motion.div>
  )
}
