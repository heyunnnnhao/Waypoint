import React, { useState, useEffect, useRef } from 'react';
import './style/Waypoint.scss';

export default function Waypoint({ children, onEnter, onLeave }) {
  const waypointRef = useRef(null);
  const [inView, setinView] = useState<number>(-1);

  useEffect(() => {
    const element: HTMLElement | null = waypointRef.current;
    const io = new IntersectionObserver((entries) => {
      setinView(entries[0].isIntersecting ? 1 : 0);
    });
    element && io.observe(element);
    return () => io.disconnect();
  }, [waypointRef]);

  useEffect(() => {
    if (inView === 1) {
      onEnter && onEnter();
    } else if (inView === 0) {
      onLeave && onLeave();
    }
  }, [inView]);

  return (
    <div ref={waypointRef} className='waypoint'>
      {children}
      <div className='status'>{inView ? '✅' : '❌'}</div>
    </div>
  );
}
