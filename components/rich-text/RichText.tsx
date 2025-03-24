import { FC } from 'react'
import ReactMarkdown from 'react-markdown'

export const RichText: FC<RichTextProps> = ({ content }) => {
  return (
    <article>
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  )
}
