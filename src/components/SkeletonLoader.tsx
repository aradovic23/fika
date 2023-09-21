import { Skeleton } from '@chakra-ui/react';

interface Props {
  height?: string | number;
  rounded?: string;
  width?: string | number;
  count?: number;
}

const SkeletonLoader = ({ height = 200, rounded = 'lg', width, count = 6 }: Props) => {
  return (
    <>
      {[...Array(count).keys()].map(i => (
        <Skeleton bg="red.300" height={height} rounded={rounded} key={i} width={width} />
      ))}
    </>
  );
};

export default SkeletonLoader;
