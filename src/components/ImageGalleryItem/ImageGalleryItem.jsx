import React from "react";

const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  showModal,
}) => {
  return (
    <li onClick={() => showModal(largeImageURL)} className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        id={id}
      />
    </li>
  );
};

export default ImageGalleryItem;
