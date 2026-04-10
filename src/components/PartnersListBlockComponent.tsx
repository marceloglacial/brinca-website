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
    <div className="mt-8 flex flex-col gap-8 md:flex-row">
      <aside className="w-full flex-shrink-0 md:w-56">
        <PartnersFilter locale={locale} />
      </aside>
      <div className="flex-1">
        <PartnersList locale={locale} />
      </div>
    </div>
  )
}
