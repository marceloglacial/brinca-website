'use client';
import { getSelectFieldData } from '@/actions';
import { DICTIONARY } from '@/constants';
import { localizedData } from '@/utils';
import { Form } from '@marceloglacial/brinca-ui';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

export const FormPartnersList: FC<FormPartnersListProps> = (
  props
): JSX.Element => {
  const [data, setData] = useState<ApiResponse<CategoryType[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const locale = params.locale as LocalesType;

  useEffect(() => {
    async function fetchData() {
      const result = await getSelectFieldData();

      if (result?.status === 'error') {
        throw new Error(DICTIONARY.FORM_ERROR[locale]);
      }
      setData(result);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) return <>loading ...</>;

  const options = localizedData(data?.data, locale).sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className='w-full'>
      <Form.Group>
        <Form.Label>Categories</Form.Label>
        <Form.Select
          name={DICTIONARY.FORM_CATEGORIES[locale]}
          options={options.map((option: OptionsType) => ({
            label: option.title,
            value: option.value,
          }))}
          required={true}
          disabled={props.pending}
          full
        />
      </Form.Group>
    </div>
  );
};
