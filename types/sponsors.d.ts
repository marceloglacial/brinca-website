type SponsorType = {
  id: string
  title: string
  image: string
  link: string
  active: boolean
}

interface SponsorsProps {
  data: {
    active: boolean
    title: string
  }
  locale?: LocalesType
}
