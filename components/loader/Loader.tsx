import { Icon } from '@/components'

export const Loader = ({ fullscreen }: { fullscreen: boolean }) => {
  return (
    <div className={`flex ${fullscreen ? 'h-screen' : ''} items-start justify-center pt-12`}>
      <div className='animate-spin'>
        <Icon type={'loading'} />
      </div>
    </div>
  )
}
