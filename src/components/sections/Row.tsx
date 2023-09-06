import { Box, Heading, HStack, IconButton, Show, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';

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

export function Row<T>({
  items,
  heading,
  render,
}: {
  items: T[];
  heading: string;
  render: (item: T) => React.ReactNode;
}) {
  const contentWrapper = useRef<HTMLDivElement>(null);
  const [snapEnabled, setSnapEnabled] = useState(true);

  const handleScrollButtonClick = (wrapper: HTMLDivElement, step: number) => {
    setSnapEnabled(false);
    sideScroll(wrapper, 15, 900, step);
  };

  return (
    <VStack spacing={2}>
      <HStack justify="space-between" w="full">
        <Heading fontSize="xl">{heading}</Heading>

        {items?.length > 4 && (
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
        {items?.map((item, idx) => (
          <Box key={idx}>{render(item)}</Box>
        ))}
      </HStack>
    </VStack>
  );
}
