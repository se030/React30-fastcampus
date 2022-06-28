import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Slick = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return <Slider {...settings}>
        <div>
            <h3 style={{ width: 500, height: 160, background: "#ffff66", textAlign: "center" }}>1</h3>
        </div>
        <div>
            <h3 style={{ width: 500, height: 160, background: "#ffff66", textAlign: "center" }}>2</h3>
        </div>
        <div>
            <h3 style={{ width: 500, height: 160, background: "#ffff66", textAlign: "center" }}>3</h3>
        </div>
        <div>
            <h3 style={{ width: 500, height: 160, background: "#ffff66", textAlign: "center" }}>4</h3>
        </div>
        <div>
            <h3 style={{ width: 500, height: 160, background: "#ffff66", textAlign: "center" }}>5</h3>
        </div>
        <div>
            <h3 style={{ width: 500, height: 160, background: "#ffff66", textAlign: "center" }}>6</h3>
        </div>
    </Slider>
}

export default Slick;