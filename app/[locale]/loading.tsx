import { Icon } from '@/components';

const Loading = () => {
  return (
    <div className='w-screen flex justify-center items-center'>
      <div className=' animate-spin'>
        <Icon type={'loading'} />
      </div>
    </div>
  );
};
export default Loading;
