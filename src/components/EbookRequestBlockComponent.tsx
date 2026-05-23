import SubmitEbookRequestForm from './SubmitEbookRequestForm'

type Props = {
  block: {
    consentText?: string | null
    disclaimerText?: string | null
    downloadUrl: string
  }
}

export default function EbookRequestBlockComponent({ block }: Props) {
  return (
    <SubmitEbookRequestForm
      disclaimerText={block.disclaimerText}
      consentText={block.consentText}
      downloadUrl={block.downloadUrl}
    />
  )
}
