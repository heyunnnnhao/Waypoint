import React, { useState, useEffect, useRef } from 'react';
import './style/Waypoint.scss';

export default function Waypoint({ children }): JSX.Element {
  const waypointRef = useRef(null);

  useEffect(() => {
    const element: HTMLElement | null = waypointRef.current;
    const io = new IntersectionObserver((entries) => {
     alert(entries[0].isIntersecting ? 'entering' : 'leaving');
    });
    element && io.observe(element);
    return () => io.disconnect();
  }, [waypointRef]);

  return (
    <div ref={waypointRef} className='waypoint'>
      {children}
    </div>
  );
}
