import PartnersListMenu from '@/components/partners-list/PartnersListMenu';
import PartnersSection from '@/components/partners-list/PartnersSection';
import { COLLECTIONS } from '@/constants';
import { getDataByType, getPageByType } from '@/services';
import { sortArray } from '@/utils';
import { Heading } from '@marceloglacial/brinca-ui';

const PartnersPage = async ({
  params,
}: PageParamsType): Promise<JSX.Element> => {
  const data = await getDataByType(COLLECTIONS.PARTNERS_TYPES);
  const pageData = await getPageByType(
    COLLECTIONS.PARTNERS_CATEGORY,
    params.locale,
    params.tag || ''
  );

  const sections: PartnersSectionProps[] = sortArray(
    data.data,
    `title.${params.locale}`
  );

  return (
    <div className='partners-list grid grid-cols-1 gap-16'>
      <Heading>
        <h1 className=' first-letter:uppercase'>
          {params.slug} - {pageData.data.title[params.locale]}
        </h1>
      </Heading>
      {sections.map((section) => (
        <PartnersSection
          {...section}
          locale={params.locale}
          category={params.tag}
          key={section.id}
        />
      ))}
      <PartnersListMenu locale={params.locale} />
    </div>
  );
};
export default PartnersPage;
