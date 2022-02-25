import React, { useState, useEffect, useRef } from 'react';
import './style/Waypoint.scss';

export default function Waypoint({ children }): JSX.Element {
  const [exposed, setExposed] = useState(false);
  const waypointRef = useRef(null);

  useEffect(() => {
    const element: HTMLElement | null = waypointRef.current;
    const io = new IntersectionObserver((entries) => {
      console.log(entries[0].isIntersecting ? 'entering' : 'leaving');
    });
    element && io.observe(element);
  }, [waypointRef]);

  return exposed ? (
    children
  ) : (
    <div ref={waypointRef} className='waypoint'>
      {children}
    </div>
  );
}
