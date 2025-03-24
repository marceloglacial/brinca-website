import { Icon } from '@/components'

const Loading = () => {
  return (
    <div className='flex h-screen items-start justify-center pt-12'>
      <div className='animate-spin'>
        <Icon type={'loading'} />
      </div>
    </div>
  )
}
export default Loading
