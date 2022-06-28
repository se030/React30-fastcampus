import React from 'react';
import Antd from './components/Antd';
import Responsive from './components/Responsive';
import Slick from './components/Slick';
import Carousel from './components/Carousel';

const containerStyle: React.CSSProperties = {
  width: '100%',
  margin: "auto",
  marginTop: 100,
  display: 'flex',
  flexDirection: 'column',
  rowGap: '30px',
  alignItems: 'center',
};
function App() {
  return (
    <div style={containerStyle}>
      <Carousel enableLoop autoLoop direction='column'>
        {[<h2>first</h2>, <h2>second</h2>, <h2>third</h2>]}
      </Carousel>

      <div>Antd</div>
      <Antd />
      <div>Responsive</div>
      <Responsive />
      <div>Slick</div>
      <Slick />
    </div>
  );
}

export default App;
