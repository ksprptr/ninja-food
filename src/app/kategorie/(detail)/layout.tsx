import CategoryHeader from './components/CategoryHeader';
import { PropsWithChildren } from 'react';

/**
 * Component representing a category pages layout
 */
export default function CategoryLayout({ children }: PropsWithChildren) {
  return (
    <>
      {/* Category header */}
      <CategoryHeader />

      {/* Category content */}
      {children}
    </>
  );
}
