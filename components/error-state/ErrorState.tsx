import { FC } from 'react';

interface ErrorStateProps {
  data?: ApiError;
}

export const ErrorState: FC<ErrorStateProps> = (props): JSX.Element => {
  if (!props?.data)
    return <h1 className=' text-red-600'>Error loading content</h1>;

  console.error(props.data.error);

  return (
    <div className='error-state py-2 px-4 border border-red-600 rounded-xl bg-red-600'>
      <h2 className=' text-white'>Error: {props.data.error.message}</h2>
    </div>
  );
};
