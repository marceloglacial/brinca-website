import PartnersListMenu from '@/components/partners-list/PartnersListMenu';
import PartnersSection from '@/components/partners-list/PartnersSection';

export default async function TagPage({ params }: PageParamsType) {
  return (
    <div className='partners-list pt-8 grid grid-cols-1 gap-16'>
      <PartnersSection locale={params.locale} filter={params.tag} isMember />
      <PartnersSection locale={params.locale} filter={params.tag} />
      <PartnersListMenu locale={params.locale} />
    </div>
  );
}
