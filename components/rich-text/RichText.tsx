import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

export const RichText: FC<RichTextProps> = ({ content }): JSX.Element => {
  return (
    <article>
      <ReactMarkdown className={'grid grid-cols-1 gap-6'}>
        {content}
      </ReactMarkdown>
    </article>
  );
};
