import { Heading, HStack, IconButton, Show, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import type { Category } from '@prisma/client';
import { useRef, useState } from 'react';
import type { DrinkWithCategory } from '../ImageCard';
import { ImageCard } from '../ImageCard';

type Props = {
  heading: string;
  data: (DrinkWithCategory | Category)[];
  type: 'drinks' | 'categories';
  showModal?: boolean;
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

const ScrollableRow = ({ heading, data, type, showModal }: Props) => {
  const contentWrapper = useRef<HTMLDivElement>(null);
  const [snapEnabled, setSnapEnabled] = useState(true);

  const handleScrollButtonClick = (wrapper: HTMLDivElement, step: number) => {
    setSnapEnabled(false);
    sideScroll(wrapper, 15, 900, step);
  };

  if (!data || data.length < 1) {
    return null;
  }

  return (
    <VStack spacing={4}>
      <HStack justify="space-between" w="full">
        <Heading fontSize="xl">{heading}</Heading>

        {data?.length > 4 && (
          <Show above="md">
            <HStack>
              <IconButton
                variant="ghost"
                aria-label="scroll-left"
                icon={<ChevronLeftIcon className="h-6 w-6" />}
                onClick={() => {
                  contentWrapper.current && handleScrollButtonClick(contentWrapper.current, -10);
                }}
              />
              <IconButton
                variant="ghost"
                aria-label="scroll-right"
                icon={<ChevronRightIcon className="h-6 w-6" />}
                onClick={() => {
                  contentWrapper.current && handleScrollButtonClick(contentWrapper.current, 10);
                }}
              />
            </HStack>
          </Show>
        )}
      </HStack>
      <HStack
        spacing={4}
        overflowX="scroll"
        w="full"
        ref={contentWrapper}
        scrollSnapType={snapEnabled ? 'x proximity' : undefined}
        scrollSnapStop={snapEnabled ? 'always' : undefined}
      >
        {data?.map(item => (
          <ImageCard key={item.id} type={type} data={item} showModal={showModal} />
        ))}
      </HStack>
    </VStack>
  );
};

export default ScrollableRow;
