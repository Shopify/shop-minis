import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import ClassNames from "embla-carousel-class-names";
import {
  useNavigateWithTransition,
  Card,
  Button,
  Touchable,
} from "@shopify/shop-minis-react";

export function CarouselTest() {
  const navigate = useNavigateWithTransition();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);

  // Basic carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Carousel with Autoplay
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  // Carousel with AutoScroll
  const [emblaRef3] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ speed: 1, stopOnInteraction: false }),
  ]);

  // Carousel with ClassNames
  const [emblaRef4] = useEmblaCarousel({ loop: false }, [ClassNames()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onSelect2 = useCallback(() => {
    if (!emblaApi2) return;
    setSelectedIndex2(emblaApi2.selectedScrollSnap());
  }, [emblaApi2]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi2) return;
    onSelect2();
    emblaApi2.on("select", onSelect2);
    return () => {
      emblaApi2.off("select", onSelect2);
    };
  }, [emblaApi2, onSelect2]);

  const slides = Array.from({ length: 6 });
  const productSlides = [
    { id: 1, name: "Product 1", price: "$29.99", color: "bg-blue-500" },
    { id: 2, name: "Product 2", price: "$39.99", color: "bg-green-500" },
    { id: 3, name: "Product 3", price: "$49.99", color: "bg-purple-500" },
    { id: 4, name: "Product 4", price: "$59.99", color: "bg-red-500" },
    { id: 5, name: "Product 5", price: "$69.99", color: "bg-yellow-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
                    <Touchable
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg"
            style={{ minHeight: "48px", minWidth: "48px" }}
          >
            <span className="text-xl">←</span>
          </Touchable>
          <div className="flex-1 ml-2">
            <h1 className="text-lg font-bold text-gray-900">Embla Carousel</h1>
            <p className="text-xs text-gray-600">
              Multiple carousel variants & plugins
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Basic Carousel */}
        <div className="p-4 space-y-4">
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Basic Carousel</h3>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 relative aspect-[16/9]"
                  >
                    <div className="absolute inset-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
                        <Touchable
                onClick={scrollPrev}
                className="p-2 rounded-lg bg-gray-100 active:bg-gray-200"
              >
                ←
              </Touchable>

              <div className="flex gap-2">
                {slides.map((_, index) => (
                            <Touchable
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedIndex ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

                        <Touchable
                onClick={scrollNext}
                className="p-2 rounded-lg bg-gray-100 active:bg-gray-200"
              >
                →
              </Touchable>
            </div>
          </Card>

          {/* Autoplay Carousel */}
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Autoplay Plugin</h3>
              <p className="text-xs text-gray-600">
                Auto-advances every 3 seconds
              </p>
            </div>

            <div className="overflow-hidden" ref={emblaRef2}>
              <div className="flex">
                {productSlides.map((slide) => (
                  <div key={slide.id} className="flex-[0_0_100%] min-w-0 p-4">
                    <div className={`${slide.color} rounded-lg p-6 text-white`}>
                      <h4 className="text-xl font-bold mb-2">{slide.name}</h4>
                      <p className="text-3xl font-bold mb-4">{slide.price}</p>
                      <Button variant="secondary" className="w-full">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 flex justify-center gap-2">
              {productSlides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedIndex2 ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </Card>

          {/* Auto Scroll Carousel */}
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Auto Scroll Plugin
              </h3>
              <p className="text-xs text-gray-600">
                Continuous smooth scrolling
              </p>
            </div>

            <div className="overflow-hidden" ref={emblaRef3}>
              <div className="flex">
                {[...productSlides, ...productSlides].map((slide, index) => (
                  <div
                    key={`${slide.id}-${index}`}
                    className="flex-[0_0_50%] min-w-0 p-2"
                  >
                    <div className="bg-white border rounded-lg p-4 text-center">
                      <div
                        className={`w-full h-20 ${slide.color} rounded mb-2`}
                      />
                      <p className="text-sm font-medium">{slide.name}</p>
                      <p className="text-lg font-bold">{slide.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Class Names Plugin */}
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Class Names Plugin
              </h3>
              <p className="text-xs text-gray-600">
                Adds CSS classes to slides based on state
              </p>
            </div>

            <div className="overflow-hidden" ref={emblaRef4}>
              <div className="flex">
                {slides.map((_, index) => (
                  <div key={index} className="flex-[0_0_80%] min-w-0 p-2">
                    <div className="bg-gray-100 rounded-lg p-8 text-center transition-all duration-300 hover:bg-blue-500 hover:text-white">
                      <span className="text-2xl font-bold">
                        Slide {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Features */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Embla Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Touch/swipe support with momentum scrolling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Multiple slides per view</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Loop & rewind options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Autoplay, auto-scroll, fade plugins</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Responsive breakpoints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Lightweight (&lt; 25kb gzipped)</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
