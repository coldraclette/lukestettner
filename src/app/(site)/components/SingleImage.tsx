import Image from 'next/image';

import { urlForImage, urlForSmallerImage } from '../../../../sanity/lib/image';
import { ProjectImage } from '../types';

interface SingleImageProps {
  image: ProjectImage;
  inModal?: boolean;
  onImageClick?: any;
  index?: number;
}

export default function SingleImage({
  image,
  inModal = false,
  onImageClick,
  index,
}: SingleImageProps) {
  if (!image) return null;

  const fixedHeightRow = 150;
  const fixedHeightModal = 800;

  const dynamicWidthRow =
    image.asset.metadata.dimensions.aspectRatio * fixedHeightRow;
  const dynamicWidthModal =
    image.asset.metadata.dimensions.aspectRatio * fixedHeightModal;

  if (inModal) {
    return (
      <div className="relative mr-[15px]">
        <Image
          alt=""
          height={fixedHeightModal}
          width={dynamicWidthModal}
          src={urlForImage(image)}
          sizes="(min-width: 1024px) 1200px, 100vw"
          className={`h-auto w-screen object-contain lg:h-[90vh] lg:w-auto`}
          placeholder="blur"
          blurDataURL={image.asset.metadata.lqip}
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="relative mr-[15px]">
      <Image
        onClick={() => {
          onImageClick(index);
        }}
        alt=""
        height={fixedHeightRow}
        width={dynamicWidthRow}
        src={urlForSmallerImage(image)}
        sizes="213px"
        className={`h-[150px] w-auto object-contain `}
        placeholder="blur"
        blurDataURL={image.asset.metadata.lqip}
      />
    </div>
  );
}
