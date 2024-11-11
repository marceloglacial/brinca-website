import { COLLECTIONS } from '@/constants';
import { getPageDataBySlug } from '@/services';
import { FC } from 'react';
import { Alert } from '@/components';
import Image from 'next/image';

export const Sponsors: FC<SponsorsProps> = async (
  props
): Promise<JSX.Element> => {
  if (!props.data.active) return <></>;

  const result = await getPageDataBySlug(COLLECTIONS.SPONSORS, props.locale);

  if (result.status === 'error') return <Alert message={result.message} />;

  const sponsors = result.data as SponsorType[];

  return (
    <div data-sponsors-container className=' flex flex-col gap-2'>
      <div data-sponsors-title className=' text-lg font-bold'>
        {props.data.title}
      </div>
      <div
        data-sponsors-list
        className='flex flex-wrap gap-8 justify-evenly bg-gray-100 rounded-xl p-8'
      >
        {sponsors.map((sponsor) => {
          if (!sponsor.active) return <></>;
          return (
            <div data-sponsor key={sponsor.id} className='relative w-64 h-32'>
              <a href={sponsor.link} target='_blank'>
                <Image
                  src={sponsor.image}
                  alt={'Sponsor logo'}
                  fill
                  className=' object-contain'
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
