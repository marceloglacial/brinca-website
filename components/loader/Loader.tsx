import { Icon } from '@/components'

export const Loader = () => {
  return (
    <div className='flex h-screen items-start justify-center pt-12'>
      <div className='animate-spin'>
        <Icon type={'loading'} />
      </div>
    </div>
  )
}
