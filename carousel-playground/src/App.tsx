import React from 'react';
import Antd from './components/Antd';
import Responsive from './components/Responsive';
import Slick from './components/Slick';

const containerStyle: React.CSSProperties = {
  width: '1000px',
  margin: "auto",
  marginTop: 100,
  display: 'flex',
  flexDirection: 'column',
  rowGap: '10px'
};
function App() {
  return (
    <div style={containerStyle}>
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
