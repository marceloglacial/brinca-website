import { Form } from '@marceloglacial/brinca-ui';
import { FC } from 'react';

export const FormCollectionList: FC<FormCollectionListProps> = (
  props
): JSX.Element => {
  const options = props.options.map((option) => {
    return {
      label: option.attributes.title,
      value: option.attributes.slug,
    };
  });
  return <Form.Select disabled={props.pending} options={options} full />;
};
