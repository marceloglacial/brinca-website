import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'
import SubmitMentorRequestForm from './SubmitMentorRequestForm'

type Props = {
  block: {
    id?: string | null
    blockType: 'mentorRequestBlock'
    introText?: object | null
  }
}

export default function MentorRequestBlockComponent({ block }: Props) {
  return (
    <div className="mentor-request-block">
      {block.introText ? (
        <div className="intro-text" style={{ marginBottom: '2rem' }}>
          <RichText data={block.introText as any} converters={defaultJSXConverters} />
        </div>
      ) : null}

      <SubmitMentorRequestForm />
    </div>
  )
}
