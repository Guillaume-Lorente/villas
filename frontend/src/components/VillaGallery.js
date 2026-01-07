"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function VillaGallery({ images }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 768);
    }
  }, []);

  const slides = images.map((img) => ({
    src: img.src,
    description: img.alt,
  }));

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden shadow-md"
      role="region"
      aria-label="Galerie de la villa"
    >
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Navigation]}
        className="rounded-xl"
        watchSlidesProgress={true}
        onSlideChange={(swiper) => setIndex(swiper.realIndex)}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative h-[400px] md:h-[600px] cursor-pointer group"
              onClick={() => {
                setOpen(true);
                setIndex(i);
              }}
              tabIndex={0}
              role="button"
              aria-label={`Voir l’image agrandie : ${img.alt}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpen(true);
                  setIndex(i);
                }
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#223e50]/90 text-[#eeb868] text-sm px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
                Cliquer pour ouvrir la galerie de photos
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="custom-prev absolute inset-y-0 left-0 z-10"
        aria-label="Image précédente"
        role="button"
        tabIndex={0}
      >
        <div className="w-12 h-full flex items-center justify-center group">
          <div className="swiper-button-prev !static !text-[#ffffff] group-hover:scale-125 transition-transform duration-300" />
        </div>
      </div>

      <div
        className="custom-next absolute inset-y-0 right-0 z-10"
        aria-label="Image suivante"
        role="button"
        tabIndex={0}
      >
        <div className="w-12 h-full flex items-center justify-center group">
          <div className="swiper-button-next !static !text-[#ffffff] group-hover:scale-125 transition-transform duration-300" />
        </div>
      </div>

      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Thumbnails]}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
          thumbnailsContainer: {
            background: "#223e50",
            padding: "1rem 0",
          },
          thumbnail: {
            borderRadius: "0.5rem",
            border: "2px solid transparent",
          },
          thumbnailActive: {
            borderColor: "#eeb868",
          },
        }}
        render={{
          slide: ({ slide }) => (
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <img
                src={slide.src}
                alt={slide.description}
                className="max-h-[80vh] object-contain rounded-lg shadow-xl"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute bottom-0 w-full bg-[#223e50]/80 text-[#eeb868] text-sm text-center py-4 px-6 font-medium">
                {slide.description}
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}
