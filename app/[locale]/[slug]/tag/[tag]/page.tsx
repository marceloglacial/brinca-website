import { PartnersList } from '@/components';
import { Heading } from '@marceloglacial/brinca-ui';

const PartnersPage = async (props: PageParamsType): Promise<JSX.Element> => {
  const params = await props.params;

  return (
    <>
      <Heading>
        <h1 className=' first-letter:uppercase'>{params.slug}</h1>
      </Heading>
      <PartnersList />
    </>
  );
};
export default PartnersPage;
