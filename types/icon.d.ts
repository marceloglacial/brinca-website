type IconTypes =
  | 'facebook'
  | 'instagram'
  | 'whatsapp'
  | 'linkedin'
  | 'loading'
  | 'brazilFlag'
  | 'canadaFlag'

interface IconProps {
  type: IconTypes
  alt?: string
}
