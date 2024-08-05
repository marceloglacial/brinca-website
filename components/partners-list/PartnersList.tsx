import { getPartners, getPartnersMenu } from '@/services';
import PartnersListMenu from './PartnersListMenu';
import PartnersSection from './PartnersSection';
import { FC } from 'react';

export const PartnersList: FC<PartnersListProps> = async (
  props
): Promise<JSX.Element> => {
  const menu = await getPartnersMenu();
  const partners = await getPartners('partner');
  const community = await getPartners('community');

  return (
    <div className='partners-list pt-8 grid grid-cols-1 gap-16'>
      <PartnersListMenu
        title={{ en: 'Categories', 'pt-BR': 'Categorias' }}
        items={menu}
        locale={props.language}
      />
      <PartnersSection
        title={{ en: 'Partners', 'pt-BR': 'Parceiros' }}
        locale={props.language}
        items={partners}
      />
      <PartnersSection
        title={{ en: 'Community', 'pt-BR': 'Comunidade' }}
        locale={props.language}
        items={community}
      />
    </div>
  );
};
