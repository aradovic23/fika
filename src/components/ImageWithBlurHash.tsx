import { Image } from '@chakra-ui/react';
import type { ImageProps } from '@chakra-ui/react';
import { Blurhash } from 'react-blurhash';

interface ImageWithBlurHashProps extends ImageProps {
  blurHash?: string | null;
}
const ImageWithBlurhash = ({ src, blurHash, ...rest }: ImageWithBlurHashProps) => {
  if (blurHash) {
    return (
      <>
        <Image
          src={src}
          alt="image"
          {...rest}
          fallback={<Blurhash hash={blurHash} width="100%" height="100%" resolutionX={32} resolutionY={32} />}
        />
      </>
    );
  } else {
    return <Image src={src} {...rest} alt="image" />;
  }
};

export default ImageWithBlurhash;
