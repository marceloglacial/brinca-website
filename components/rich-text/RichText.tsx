import { Section } from '@marceloglacial/brinca-ui';
import { FC } from 'react';

export const RichText: FC<RichTextProps> = ({
  content,
  language,
}): JSX.Element => {
  return <Section dangerouslySetInnerHTML={{ __html: content[language] }} />;
};
