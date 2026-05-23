export default function SectionHeading({ title }: { title: string }) {
  return (
    <div className="relative pb-2 text-center font-bold after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-12 after:-translate-x-1/2 after:rounded-full after:bg-black md:pb-4 md:after:w-24">
      <h2>{title}</h2>
    </div>
  )
}
