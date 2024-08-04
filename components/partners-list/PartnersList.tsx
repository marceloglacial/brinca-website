import PartnersListMenu from './PartnersListMenu';
import PartnersSection from './PartnersSection';

export const PartnersList = () => {
  return (
    <div className='partners-list pt-8 grid grid-cols-1 gap-16'>
      <PartnersListMenu />
      <PartnersSection
        title={{ en: 'Partners', 'pt-BR': 'Parceiros' }}
        locale={'en'}
        items={[]}
      />
    </div>
  );
};
