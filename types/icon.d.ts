type IconTypes = 'facebook' | 'instagram' | 'whatsapp' | 'linkedin' | 'loading'
type IconVariants = 'white' | 'green'

interface IconProps {
  type: IconTypes
  variant?: IconVariants
}
