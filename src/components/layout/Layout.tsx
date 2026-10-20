import { PropsWithChildren } from 'react';

/**
 * Component representing an app layout
 */
export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='max-w-content gap-section px-gutter py-section mx-auto flex w-full flex-col'>
      {children}
    </div>
  );
}
