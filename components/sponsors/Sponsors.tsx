import { getContentByType } from '@/services';
import { FC } from 'react';
import { ErrorState } from '../error-state/ErrorState';
import { normalizeData, normalizeItem } from '@/utils';
import { COLLECTIONS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

export const Sponsors: FC<SponsorsProps> = async (
  props
): Promise<JSX.Element> => {
  const response = await getContentByType(COLLECTIONS.SPONSORS, 'en');

  if ('error' in response) return <ErrorState data={response} />;

  const items = response.data;

  const sponsor = props.data;
  if (!sponsor.isActive) return <></>;

  return (
    <div className='sponsors'>
      <div className='sponsors__title'>
        <p className=' font-bold'>
          {new Date().getFullYear()} {sponsor.title}
        </p>
      </div>
      <div className='sponsors__content flex items-center justify-evenly p-4 rounded-xl bg-gray-100'>
        {items.map((item) => {
          const sponsor = normalizeItem(item);
          const image = normalizeData(sponsor.image);

          return (
            <Link href={sponsor.link} target='_blank' key={sponsor.id}>
              <figure className=' relative w-[200px] h-[150px]'>
                <Image
                  src={image.url}
                  alt={`${sponsor.name} logo`}
                  className=' object-contain'
                  sizes='150px, 60px'
                  fill
                />
              </figure>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
