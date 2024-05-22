import { Hero, Link, Section } from '@marceloglacial/brinca-ui';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='main'>
      <Section spacing='xl'>
        <Hero reversed>
          <Hero.Image rounded shadow>
            <img
              alt='Hero Image'
              className='w-full h-full object-cover'
              src='https://images.unsplash.com/photo-1600887876365-f7dcf0e5e985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9ydGFsZXphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60'
            />
          </Hero.Image>
          <Hero.Body>
            <h1>Reprehenderit quis consequat</h1>
            <p>
              Proident proident nostrud velit culpa proident eiusmod pariatur.
              Aliqua adipisicing culpa fugiat voluptate eiusmod non laboris esse
              non veniam. Id eu duis sint ad ullamco proident nostrud ad
              excepteur sint minim eu proident.
            </p>
            <Link variant='secondary'>Voluptate minim</Link>
          </Hero.Body>
        </Hero>
      </Section>
    </main>
  );
}
