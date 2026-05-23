import { cn } from '@/lib/utils'

export function BrincaLogo({ className }: { className?: string }) {
  return (
    <img
      src="https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png"
      alt="Brinca Logo"
      className={cn('h-[65px] w-[160px] object-contain md:h-[95px] md:w-[230px]', className)}
    />
  )
}

export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" width="20" height="20" className={cn('fill-[#16a34a]', className)} aria-hidden="true">
      <rect width="100" height="15" />
      <rect y="30" width="100" height="15" />
      <rect y="60" width="100" height="15" />
    </svg>
  )
}

export function BrazilFlagIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 640 480" className={className} aria-hidden="true">
      <path fill="#229e45" fillRule="evenodd" d="M0 0h640v480H0z" />
      <path fill="#f8e509" fillRule="evenodd" d="m321.4 436 301.5-195.7L319.6 44 17.1 240.7z" />
      <path fill="#2b49a3" fillRule="evenodd" d="M452.8 240c0 70.3-57.1 127.3-127.6 127.3A127.4 127.4 0 1 1 452.8 240" />
      <path fill="#fff" fillRule="evenodd" d="M444.4 285.8a125 125 0 0 0 5.8-19.8c-67.8-59.5-143.3-90-238.7-83.7a125 125 0 0 0-8.5 20.9c113-10.8 196 39.2 241.4 82.6" />
    </svg>
  )
}

export function CanadaFlagIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 640 480" className={className} aria-hidden="true">
      <path fill="#fff" d="M150.1 0h339.7v480H150z" />
      <path fill="#d52b1e" d="M-19.7 0h169.8v480H-19.7zm509.5 0h169.8v480H489.9zM201 232l-13.3 4.4 61.4 54c4.7 13.7-1.6 17.8-5.6 25l66.6-8.4-1.6 67 13.9-.3-3.1-66.6 66.7 8c-4.1-8.7-7.8-13.3-4-27.2l61.3-51-10.7-4c-8.8-6.8 3.8-32.6 5.6-48.9 0 0-35.7 12.3-38 5.8l-9.2-17.5-32.6 35.8c-3.5.9-5-.5-5.9-3.5l15-74.8-23.8 13.4q-3.2 1.3-5.2-2.2l-23-46-23.6 47.8q-2.8 2.5-5 .7L264 130.8l13.7 74.1c-1.1 3-3.7 3.8-6.7 2.2l-31.2-35.3c-4 6.5-6.8 17.1-12.2 19.5s-23.5-4.5-35.6-7c4.2 14.8 17 39.6 9 47.7" />
    </svg>
  )
}
