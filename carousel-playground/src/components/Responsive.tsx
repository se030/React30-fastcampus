import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Responsive = () => {
    return <Carousel width={500} infiniteLoop showThumbs={false}>
        <div style={{
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#ffbb99',
        }}>
            1
        </div>
        <div style={{
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#b3bfff',
        }}>
            2
        </div>
        <div style={{
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#bfe600',
        }}>
            3
        </div>
    </Carousel>
}

export default Responsive;