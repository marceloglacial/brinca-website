import { FC } from 'react';

interface ErrorStateProps {
  data?: ApiError;
}

export const ErrorState: FC<ErrorStateProps> = (props): JSX.Element => {
  if (!props?.data) return <h1>Error loading content</h1>;

  console.error(props.data.error);

  return (
    <div className='error-state'>
      <h1>{props.data.error.message}</h1>
    </div>
  );
};
