import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/";

const ImageGallery = ({ list, showModal }) => {
  const newList = list.map((item) => (
    <ImageGalleryItem showModal={showModal} key={`${item.id}`} {...item} />
  ));
  return <ul className="ImageGallery">{newList}</ul>;
};

export default ImageGallery;
