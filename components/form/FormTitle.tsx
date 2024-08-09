import { FC } from 'react';
import { Heading } from '@marceloglacial/brinca-ui';

export const FormTitle: FC<FormTitleProps> = ({
  title,
  language,
}): JSX.Element => {
  if (!title) return <></>;
  return (
    <Heading>
      <h2>{title[language]}</h2>
    </Heading>
  );
};
