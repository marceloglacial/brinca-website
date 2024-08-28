import { normalizeData } from '@/utils';
import { Form } from '@marceloglacial/brinca-ui';
import { FC } from 'react';

export const FormCollectionList: FC<FormCollectionListProps> = (
  props
): JSX.Element => {
  const options = props.options.map((option) => {
    return {
      label: option.title,
      value: option.id,
    };
  });
  return (
    <Form.Select
      name={props.name}
      disabled={props.pending}
      options={options}
      full
    />
  );
};
