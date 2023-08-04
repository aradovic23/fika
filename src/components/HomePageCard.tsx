import { Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

type Props = {
  heading: string;
  children: React.ReactNode;
};

const sideScroll = (element: HTMLDivElement, speed: number, distance: number, step: number) => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    element.scrollLeft += step;
    scrollAmount += Math.abs(step);
    if (scrollAmount >= distance) {
      clearInterval(slideTimer);
    }
  }, speed);
};

const HomePageCard = ({ heading, children }: Props) => {
  const contentWrapper = useRef<HTMLDivElement>(null);

  return (
    <VStack spacing={2}>
      <HStack justify="space-between" w="full">
        <Heading fontSize="xl">{heading}</Heading>

        <HStack>
          <Button
            rounded="full"
            variant="ghost"
            onClick={() => {
              contentWrapper.current && sideScroll(contentWrapper.current, 25, 200, -10);
            }}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            rounded="full"
            onClick={() => {
              contentWrapper.current && sideScroll(contentWrapper.current, 25, 200, 10);
            }}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </HStack>
      </HStack>
      <HStack gap={3} overflowX="scroll" w="full" ref={contentWrapper}>
        {children}
      </HStack>
    </VStack>
  );
};

export default HomePageCard;
