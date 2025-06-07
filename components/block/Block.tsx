import {
  Animation,
  ButtonGroup,
  CloudinaryGallery,
  ContentList,
  Embed,
  Form,
  Hero,
  Instagram,
  PartnersList,
  RichText,
  Sponsors,
} from '@/components'
import { FC } from 'react'
import { CalendarList } from '@/components/calendar-list/CalendarList'

export const Block: FC<BlockProps> = (props) => {
  if (!props.content) return <></>

  let block
  switch (props.content.type) {
    case 'hero':
      block = <Hero {...props.content.value} />
      break
    case 'sponsors':
      block = <Sponsors data={props.content.value} locale={props.locale} />
      break
    case 'youtube':
      block = <Embed url={props.content.value} type={props.content.type} />
      break
    case 'content':
      block = <RichText content={props.content.value} />
      break
    case 'cloudinary_folder':
      block = <CloudinaryGallery path={props.content.value} />
      break
    case 'content_list':
      block = <ContentList data={props.content.value} locale={props.locale} />
      break
    case 'calendar_list':
      block = <CalendarList locale={props.locale} />
      break
    case 'partners_list':
      block = <PartnersList locale={props.locale} />
      break
    case 'form_id':
      block = <Form id={props.content.value} />
      break
    case 'button_group':
      block = <ButtonGroup content={props.content.value} />
      break
    case 'instagram':
      block = <Instagram {...props.content.value} />
      break
    default:
      block = <></>
  }

  return <Animation>{block}</Animation>
}
