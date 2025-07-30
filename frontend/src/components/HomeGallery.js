"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Images avec descriptions (accessibilité)
const images = [
  {
    src: "/grande-anse.jpg",
    alt: "Plage de Grande Anse",
  },
  {
    src: "/tortues.jpeg",
    alt: "Tortues marines nageant dans l'eau claire de Guadeloupe",
  },
  {
    src: "/Jardin-botanique.jpg",
    alt: "Vue colorée du Jardin Botanique de Deshaies",
  },
  {
    src: "/perroquet.webp",
    alt: "Perroquet tropical au Jardin Botanique de Deshaies",
  },
  {
    src: "/paddle.jpg",
    alt: "Personne faisant du paddle à la plage de Grande Anse",
  },
];

export default function HomeGallery() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 768);
    }
  }, []);

  return (
    <div className="relative max-w-5xl mx-auto">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        modules={[Navigation]}
        navigation={
          isDesktop
            ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
            : false
        }
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isDesktop && (
        <>
          <div
            className="swiper-button-prev absolute top-1/2 -left-4 z-10 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Image précédente"
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") &&
              document.querySelector(".swiper-button-prev")?.click()
            }
          />
          <div
            className="swiper-button-next absolute top-1/2 -right-4 z-10 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Image suivante"
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") &&
              document.querySelector(".swiper-button-next")?.click()
            }
          />
        </>
      )}

      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={images.map((img) => ({
          src: img.src,
          description: img.alt,
        }))}
        render={{
          slide: ({ slide }) => (
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <img
                src={slide.src}
                alt={slide.description}
                className="max-h-[80vh] object-contain rounded-lg shadow-xl"
              />
              <div className="absolute bottom-0 w-full bg-black/70 text-white text-sm text-center py-3 px-6 font-medium">
                {slide.description}
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}
