import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/carousel.css';
import Beer from '../assets/img/beer.jpg';
import Party from '../assets/img/party_simpsons.jpg';
import Party2 from '../assets/img/party_simpsons2.jpg';

const CarouselComponent = () => {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
    >
      <div>
        <img src={Beer} alt="Imagen 1" />
      </div>
      <div>
        <img src={Party} alt="Imagen 2" />
      </div>
      <div>
        <img src={Party2} alt="Imagen 3" />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
