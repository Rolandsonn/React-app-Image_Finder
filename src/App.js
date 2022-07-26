import React, { Component, createRef } from "react";

import axios from "axios";

import "./style.css";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
export default class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    limit: 12,
    query: "",
    loading: false,
    showModal: false,
    src: null,
  };
  componentDidMount() {
    this.fetchImages();
  }
  fetchImages = async () => {
    const { currentPage, limit, query } = this.state;
    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?key=28598653-ac578a657988498e7082adc71&q=${query}&image_type=video&per_page=${limit}&page=${currentPage}`
      );

      this.setState({
        images: data.hits,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loading } = this.state;

    if (loading) {
      this.loadImages();
    }
  }
  listRef = createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.images.length < this.state.images.length) {
      const { current } = this.listRef;
      return current.scrollHeight;
    }
    return null;
  }

  loadImages = async () => {
    const { currentPage, limit, images, query } = this.state;
    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?key=28598653-ac578a657988498e7082adc71&q=${query}&image_type=video&per_page=${limit}&page=${currentPage}`
      );
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        loading: false,
      }));
    } catch (error) {
      throw new Error(error);
    }
  };

  handleLoadMore = () => {
    this.setState(({ currentPage }) => ({
      currentPage: currentPage + 1,
      loading: true,
    }));
  };

  queryRequest = ({ query }) => {
    this.setState({
      images: [],
      query,
      loading: true,
    });
  };

  toggleModal = (src) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      src,
    }));
  };

  render() {
    const { handleLoadMore, queryRequest, toggleModal } = this;

    const { images, loading, showModal, src } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={queryRequest} />
        <div ref={this.listRef}>
          <ImageGallery list={images} showModal={toggleModal} />
        </div>
        {loading && <Loader />}
        {!loading && <Button onClick={handleLoadMore} title="Load More" />}
        {showModal && (
          <Modal closeModal={toggleModal}>
            <img
              src={src}
              style={{
                height: "90vh",
                width: "70vw",
                borderRadius: "5px",
              }}
            />
          </Modal>
        )}
      </div>
    );
  }
}
