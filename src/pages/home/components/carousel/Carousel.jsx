import Carousel from 'react-bootstrap/Carousel';
import './carousel.scss'

function  AppCarousel() {
  return (  
    <div className='Crs_item'>
        <Carousel>
        <Carousel.Item interval={700}>
            <div className='item'>
              <img src="https://www.watchstore.vn/upload/image/2211-BLACK-GiAM-thang-12.webp"  />
            </div>
            </Carousel.Item>
        <Carousel.Item interval={700} >
            <div className='item'>
              <img src="https://wscdn.vn/upload/image/13-418004996-684201329.jpg?size=1920x512&fomat=webp"  />
            </div>
        </Carousel.Item>
        <Carousel.Item interval={700}>
            <div className='item'>
              <img src="https://wscdn.vn/upload/image/15-1876581131-798434204.jpg?size=1920x512&fomat=webp" />
            </div> 
        </Carousel.Item>
        <Carousel.Item interval={1000}>
            <div className='item'>
              <img src="https://lh3.googleusercontent.com/pw/ADCreHfLK69ILbFpKRb2cOjXT1khgi-LXCSielF5Ta5G406nyAqJYkM9bGl4-PdDWkT1njla8ElENSAiGd5zw8aCX3gkPle232SNB4UyCltCc-DyrCSGIHDQpnu2ii7g1KcOdW9TkJnJoQW78x5A_4d-SIZT=w2048-h596-s-no?authuser=0" />
            </div> 
        </Carousel.Item>
        </Carousel>
    </div>
  );
}

export default AppCarousel;