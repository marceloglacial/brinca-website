import SectionHeading from './SectionHeading'

export default function PageHeading({ title }: { title: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <SectionHeading title={title} />
    </div>
  )
}
