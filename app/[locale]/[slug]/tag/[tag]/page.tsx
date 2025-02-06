import { PartnersList } from '@/components';
import { COLLECTIONS, SITE } from '@/constants';
import { getDocumentBySlug } from '@/services';
import { localizedContent } from '@/utils';
import { Heading } from '@marceloglacial/brinca-ui';
import { Metadata } from 'next';

export async function generateMetadata(
  props: PageParamsType
): Promise<Metadata> {
  const params = await props.params;
  const result = await getDocumentBySlug(
    COLLECTIONS.CATEGORIES,
    params.tag,
    params.locale
  );

  if (result.status === 'error')
    return {
      title: SITE.NAME,
    };

  const page = localizedContent(result.data);

  return {
    title: `${SITE.NAME} - ${page.title}`,
  };
}

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
