interface Props {
  title: string;
  description?: string;
}

/**
 * Component representing a page header
 */
export default function PageHeader({ title, description }: Readonly<Props>) {
  return (
    <header className='mt-16 max-w-3xl space-y-4'>
      <h1 className='text-display font-semibold tracking-tight'>{title}</h1>
      {description && <p className='text-lead text-ink-soft max-w-prose'>{description}</p>}
    </header>
  );
}
