import { Skeleton } from '@chakra-ui/react';

interface Props {
  height?: string | number;
  rounded?: string;
  width?: string | number;
  count?: number;
}

const SkeletonLoader = ({ height, rounded = 'lg', width, count = 6 }: Props) => {
  return (
    <>
      {[...Array(count).keys()].map(i => (
        <Skeleton height={height} rounded={rounded} key={i} width={width} />
      ))}
    </>
  );
};

export default SkeletonLoader;
