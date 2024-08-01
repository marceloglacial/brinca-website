import { FC } from 'react';

export const RichText: FC<RichTextProps> = ({
  content,
  language,
}): JSX.Element => {
  return (
    <article
      className='grid grid-cols-1 gap-8'
      dangerouslySetInnerHTML={{ __html: content[language] }}
    />
  );
};
