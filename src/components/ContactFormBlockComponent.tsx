import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'
import ContactForm from './ContactForm'

type Props = {
  block: {
    id?: string | null
    blockType: 'contactFormBlock'
    introText?: object | null
  }
}

export default function ContactFormBlockComponent({ block }: Props) {
  return (
    <div className="contact-form-block">
      {block.introText ? (
        <div className="intro-text" style={{ marginBottom: '2rem' }}>
          <RichText data={block.introText as any} converters={defaultJSXConverters} />
        </div>
      ) : null}

      <ContactForm />
    </div>
  )
}
