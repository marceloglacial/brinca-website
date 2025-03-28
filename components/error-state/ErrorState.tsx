import { Heading, Section } from '@/components/ui'

export const ErrorState = ({ message }: { message: string }) => {
  console.debug(`Error: ${message}`)
  return (
    <Section>
      <Heading className='mb-4'>
        <h1>404: Page Not Found</h1>
      </Heading>
      <div className='text-center text-6xl'>😓</div>
    </Section>
  )
}
