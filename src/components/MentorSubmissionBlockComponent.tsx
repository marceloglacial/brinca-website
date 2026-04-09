import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'
import SubmitMentorForm from './SubmitMentorForm'

type Props = {
  block: {
    id?: string | null
    blockType: 'mentorSubmissionBlock'
    introText?: object | null
  }
}

export default function MentorSubmissionBlockComponent({ block }: Props) {
  return (
    <div className="mentor-submission-block">
      {block.introText ? (
        <div className="intro-text" style={{ marginBottom: '2rem' }}>
          <RichText data={block.introText as any} converters={defaultJSXConverters} />
        </div>
      ) : null}

      <SubmitMentorForm />
    </div>
  )
}
