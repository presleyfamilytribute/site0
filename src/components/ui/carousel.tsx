import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  options?: CarouselOptions;
  plugins?: CarouselPlugin[];
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ options, plugins, children }) => {
  const [emblaRef] = useEmblaCarousel(options, plugins);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">{children}</div>
    </div>
  );
};

export default Carousel;
