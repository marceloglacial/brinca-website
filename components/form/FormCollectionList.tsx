import { Form } from '@marceloglacial/brinca-ui';
import { FC } from 'react';

export const FormCollectionList: FC<FormCollectionListProps> = (
  props
): JSX.Element => {
  return <Form.Select disabled={props.pending} options={props.options} full />;
};
