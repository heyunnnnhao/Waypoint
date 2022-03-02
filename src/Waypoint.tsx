import { useState, useEffect, useRef } from 'react';
import 'intersection-observer'

interface WaypointProp {
  children?: any;
  onEnter: () => any;
  onLeave: () => any;
}

export default function Waypoint({ children, onEnter, onLeave }: WaypointProp) {
  const waypointRef = useRef(null);
  const [inView, setinView] = useState<number>(-1);

  useEffect(() => {
    const element: HTMLElement | null = waypointRef.current;
    const callback = (entries) => {
      setinView(entries[0].isIntersecting ? 1 : 0);
    };
    const io = new IntersectionObserver(callback);
    element && io.observe(element);
    return () => io.disconnect();
  }, [waypointRef]);

  useEffect(() => {
    if (onEnter && inView === 1) {
      onEnter();
    } else if (onLeave && inView === 0) {
      onLeave();
    }
  }, [inView]);

  return (
    <div ref={waypointRef} className='waypoint'>
      {children || null}
    </div>
  );
}
