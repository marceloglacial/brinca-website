import { FC } from 'react';
import { getDataByType } from '@/services';
import { COLLECTIONS } from '@/constants';
import PartnersListMenu from './PartnersListMenu';
import PartnersSection from './PartnersSection';
import { sortArray } from '@/utils';

export const PartnersList: FC<PartnersListProps> = async (
  props
): Promise<JSX.Element> => {
  const data = await getDataByType(COLLECTIONS.PARTNERS_TYPES);
  const sections: PartnersSectionProps[] = sortArray(
    data.data,
    `title.${props.language}`
  );
  return (
    <div className='partners-list pt-8 grid grid-cols-1 gap-16'>
      <PartnersListMenu locale={props.language} />
      {sections.map((section) => (
        <PartnersSection
          {...section}
          locale={props.language}
          key={section.id}
        />
      ))}
    </div>
  );
};
