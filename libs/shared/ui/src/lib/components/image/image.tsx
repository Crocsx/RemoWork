import NextImage from 'next/image';

export const Image = ({
  src,
  ...rest
}: Omit<React.ComponentProps<typeof NextImage>, 'src' | 'alt'> & {
  src?: string | null;
  alt: string;
}) => (src ? <NextImage src={src} {...rest} /> : <div>nope</div>);
