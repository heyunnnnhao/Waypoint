import { useState, useRef, useEffect } from 'react';
import './style/App.scss';
import Waypoint from './Waypoint';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const iteration = [0, 1, 2];

function App() {
  const [inView, setinView] = useState<Array<number>>([]);

  useEffect(() => {
    console.clear();
    console.log(inView);
  }, [inView]);

  return (
    <div className='App'>
      {iteration.map((container) => {
        return (
          <div className='container' key={container}>
            <div className='scroll-container'>
              {data.map((i, index) => {
                return (
                  <Waypoint
                    onEnter={() => {
                      setinView([...inView, i]);
                    }}
                    onLeave={() => {
                      setinView(inView.filter((a) => a !== i));
                    }}
                  >
                    <div className='content' key={index}>
                      {container}&nbsp;
                      {i}
                    </div>
                  </Waypoint>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
