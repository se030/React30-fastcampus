import { useRef } from "react";
import Draggable from "./lib/Draggable";

function App() {
  const handle = useRef(null);

  return (
    <Draggable handleRef={handle} onMove={(x,y) => console.log(x, y)} x={500} y={500}>
      <div style={{width: '100px', height: '100px', backgroundColor:'greenyellow'}}>
        <button ref={handle}>Move</button>
      </div>
    </Draggable>
  );
}

export default App;
