import PartnersListMenu from '@/components/partners-list/PartnersListMenu';
import PartnersSection from '@/components/partners-list/PartnersSection';
import { COLLECTIONS } from '@/constants';
import { getDataByType } from '@/services';
import { sortArray } from '@/utils';
import { Heading } from '@marceloglacial/brinca-ui';

const PartnersPage = async ({
  params,
}: PageParamsType): Promise<JSX.Element> => {
  const data = await getDataByType(COLLECTIONS.PARTNERS_TYPES);
  const sections: PartnersSectionProps[] = sortArray(
    data.data,
    `title.${params.locale}`
  );

  return (
    <div className='partners-list grid grid-cols-1 gap-16'>
      <Heading>
        <h1 className=' first-letter:uppercase'>{params.slug}</h1>
      </Heading>
      <PartnersListMenu locale={params.locale} />
      {sections.map((section) => (
        <PartnersSection
          {...section}
          locale={params.locale}
          category={params.tag}
          key={section.id}
        />
      ))}
    </div>
  );
};
export default PartnersPage;
