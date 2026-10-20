import { DishImage as DishImageType } from '@/common/types/dish.types';

import Image from 'next/image';

interface Props {
  image: DishImageType;
  sizes: string;
  priority?: boolean;
  eager?: boolean;
  className?: string;
}

/**
 * Component representing a dish illustration on a soft blob
 */
export default function DishImage({ image, sizes, priority, eager, className }: Readonly<Props>) {
  return (
    <div
      className={`bg-paper-muted dark:bg-night-raised relative isolate overflow-hidden ${className ?? ''}`}>
      <span className='bg-blob absolute top-1/2 left-1/2 -z-10 aspect-square h-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full' />
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        loading={eager ? 'eager' : undefined}
        sizes={sizes}
        className='object-contain p-[10%] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3 motion-reduce:transition-none'
      />
    </div>
  );
}
