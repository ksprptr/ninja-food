import { PropsWithChildren } from 'react';

export interface ExtendedProps extends PropsWithChildren {
  className?: string;
  id?: string;
}
