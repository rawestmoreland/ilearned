import { getStrapiMedia } from '../utils/media';
import Image from "next/legacy/image";
import PropTypes from 'prop-types';
import { mediaPropTypes } from '../utils/types';

const NextImage = ({ $className, media, ...props }) => {
  const { url, alternativeText, width, height } = media.data.attributes;

  const loader = ({ src, width }) => {
    return getStrapiMedia(src);
  };

  // The image has a fixed width and height
  if (props.width && props.height) {
    return <Image unoptimized src={url} alt={alternativeText || ''} {...props} />;
  }

  // The image is responsive
  return (
    <Image
      className={$className}
      loader={loader}
      layout="responsive"
      width={props.width || width || '100%'}
      height={props.height || height || '100%'}
      objectFit={props.cover ? 'cover' : 'contain'}
      src={url}
      alt={alternativeText || ''}
    />
  );
};

Image.propTypes = {
  media: mediaPropTypes,
  className: PropTypes.string,
};

export default NextImage;
