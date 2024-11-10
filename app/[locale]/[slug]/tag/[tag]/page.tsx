import { PartnersList } from '@/components';
import { COLLECTIONS } from '@/constants';
import { getDocumentBySlug } from '@/services';
import { localizedContent } from '@/utils';
import { Heading } from '@marceloglacial/brinca-ui';

const PartnersPage = async (props: PageParamsType): Promise<JSX.Element> => {
  const params = await props.params;

  if (!params.tag) return <>Error loading page</>;

  const result = await getDocumentBySlug(
    COLLECTIONS.CATEGORIES,
    params.tag,
    params.locale
  );

  const category = localizedContent(result, params.locale);

  return (
    <>
      <Heading>
        <h1 className=' first-letter:uppercase'>{category.data.title}</h1>
      </Heading>
      <PartnersList category={category.data} />
    </>
  );
};
export default PartnersPage;
