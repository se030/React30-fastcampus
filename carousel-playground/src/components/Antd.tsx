// cf) antd carousel slick 기반이라서 css끼리 충돌

import { Carousel } from "antd";
import 'antd/dist/antd.css';    // antd 사용하려면

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#00e6e6',
};
const Antd = () => {
    return <Carousel style={{ width:500 }}>
    <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>
            <img style={{ height:100 }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
}

export default Antd;