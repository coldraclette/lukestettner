'use client';

import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import useModalStore from '../store/modalStore';
import { ProjectImage, ProjectProps, ProjectTextBlock } from '../types';
import { composeClassNames } from '../utils';
import SingleImage from './SingleImage';
import SingleTextblock from './SingleTextblock';

interface ProjectRowProps {
  project: ProjectProps;
  inModal?: boolean;
  initialSlide?: number;
}

export default function ProjectRow({
  project,
  inModal = false,
  initialSlide,
}: ProjectRowProps) {
  const { openModal, selectedImageIndex } = useModalStore();

  const onImageClick = (index: number) => {
    if (!inModal) {
      openModal(project, index); // Open the modal with the project and the clicked image index
    }
  };

  const renderCorrectItem = (
    item: ProjectImage | ProjectTextBlock,
    index: number
  ) => {
    if (item._type === 'image') {
      return (
        <SingleImage
          image={item}
          inModal={inModal}
          onImageClick={onImageClick}
          index={index}
        />
      );
    } else if (item._type === 'textblock') {
      return <SingleTextblock content={item} inModal={inModal} />;
    }
  };

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        className="swiper-project h-full w-full"
        mousewheel={inModal ? { forceToAxis: false } : { forceToAxis: true }}
        modules={[Mousewheel, FreeMode]}
        freeMode={{ enabled: true, momentumBounce: false }}
        initialSlide={initialSlide}
      >
        {project.items &&
          project.items.map(
            (item: ProjectImage | ProjectTextBlock, index: number) => {
              return (
                <SwiperSlide
                  key={item._key}
                  className={composeClassNames({
                    'cursor-pointer first-of-type:pl-4 md:first-of-type:pl-12':
                      !inModal,
                  })}
                >
                  {renderCorrectItem(item, index)}
                </SwiperSlide>
              );
            }
          )}
      </Swiper>
      {!inModal && (
        <div className="mb-6 px-4 pt-2 text-lg leading-5 md:mb-2 md:pl-12">
          <h2>{project.title}</h2>
          {project.subtitle && <h3>{project.subtitle}</h3>}
          {project.year && <h4>{project.year}</h4>}
        </div>
      )}
    </>
  );
}
