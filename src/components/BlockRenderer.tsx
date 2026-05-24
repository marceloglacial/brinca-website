import PartnerSubmissionBlockComponent from './PartnerSubmissionBlockComponent'
import MentorSubmissionBlockComponent from './MentorSubmissionBlockComponent'
import MentorRequestBlockComponent from './MentorRequestBlockComponent'
import ContactFormBlockComponent from './ContactFormBlockComponent'
import EbookRequestBlockComponent from './EbookRequestBlockComponent'
import SponsorsBlockComponent from './SponsorsBlockComponent'
import EventsListBlockComponent from './EventsListBlockComponent'
import CalendarsListBlockComponent from './CalendarsListBlockComponent'
import PartnersListBlockComponent from './PartnersListBlockComponent'
import YouTubeBlockComponent from './YouTubeBlockComponent'
import GalleryBlockComponent from './GalleryBlockComponent'
import InstagramBlockComponent from './InstagramBlockComponent'
import CTABlockComponent from './CTABlockComponent'
import RichTextBlockComponent from './RichTextBlockComponent'
import HeroBlockComponent from './HeroBlockComponent'
import ImageBlockComponent from './ImageBlockComponent'

type Props = {
  block: any
  locale: string
}

export default function BlockRenderer({ block, locale }: Props) {
  switch (block.blockType) {
    case 'partnerSubmissionBlock':
      return <PartnerSubmissionBlockComponent locale={locale} />
    case 'mentorSubmissionBlock':
      return <MentorSubmissionBlockComponent />
    case 'mentorRequestBlock':
      return <MentorRequestBlockComponent />
    case 'contactFormBlock':
      return <ContactFormBlockComponent />
    case 'ebookRequestBlock':
      return <EbookRequestBlockComponent block={block} />
    case 'sponsorsBlock':
      return <SponsorsBlockComponent locale={locale} year={block.year ?? undefined} />
    case 'eventsListBlock':
      return <EventsListBlockComponent block={block} locale={locale} />
    case 'calendarsListBlock':
      return <CalendarsListBlockComponent block={block} locale={locale} />
    case 'partnersListBlock':
      return <PartnersListBlockComponent block={block} locale={locale} />
    case 'youTubeBlock':
      return <YouTubeBlockComponent block={block} />
    case 'galleryBlock':
      return <GalleryBlockComponent block={block} locale={locale} />
    case 'instagramBlock':
      return <InstagramBlockComponent block={block} />
    case 'ctaBlock':
      return <CTABlockComponent block={block} locale={locale} />
    case 'richTextBlock':
      return <RichTextBlockComponent block={block} locale={locale} />
    case 'heroBlock':
      return <HeroBlockComponent block={block} locale={locale} />
    case 'imageBlock':
      return <ImageBlockComponent block={block} />
    default:
      return null
  }
}
