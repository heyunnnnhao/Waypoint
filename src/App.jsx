import { useState, useRef } from 'react';
import './style/App.scss';
import Waypoint from './Waypoint';

function App() {
  const [inView, setinView] = useState(null);

  return (
    <div className='App'>
      <Waypoint
        onEnter={() => {
          console.log('enter');
          setinView(1);
        }}
        onLeave={() => {
          console.log('leave');
          setinView(0);
        }}
      >
        <div className='content'>content</div>
      </Waypoint>
    </div>
  );
}

export default App;
