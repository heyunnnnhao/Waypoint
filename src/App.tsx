import { useState } from 'react';
import './style/App.scss';
import Waypoint from './Waypoint';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Waypoint>
        <div className='content'>content</div>
      </Waypoint>
    </div>
  );
}

export default App;
