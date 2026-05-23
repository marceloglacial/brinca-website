import PartnersFilter from './PartnersFilter'
import PartnersList from './PartnersList'

type Props = {
  block: {
    blockType: 'partnersListBlock'
  }
  locale: string
}

export default function PartnersListBlockComponent({ block: _block, locale }: Props) {
  return (
    <div className="mt-2 flex flex-col gap-6 md:mt-4 md:gap-8">
      <aside className="w-full">
        <PartnersFilter locale={locale} />
      </aside>
      <div className="flex-1">
        <PartnersList locale={locale} />
      </div>
    </div>
  )
}
