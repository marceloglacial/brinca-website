type IconTypes =
  | 'facebook'
  | 'instagram'
  | 'whatsapp'
  | 'linkedin'
  | 'loading'
  | 'brazilFlag'
  | 'canadaFlag'
type IconVariants = 'white' | 'green'

interface IconProps {
  type: IconTypes
  variant?: IconVariants
}
