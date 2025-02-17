"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const CarouselComponent = () => {
  const images = [
    "/10117508.jpg",
    "/10135204.jpg",
    "/10137826.jpg",
  ];

  return (
    <div className="my-3 w-[90vw] mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {images.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <Image src={imgSrc} alt={`Slide ${index + 1}`} width={900} height={500} className="w-full h-auto" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
