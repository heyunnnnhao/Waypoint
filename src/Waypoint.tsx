import { useState, useEffect, useRef, cloneElement, isValidElement } from 'react';

const clientHeight = window.innerHeight;
const clientWidth = window.innerWidth;

export interface WaypointProps {
  children?: JSX.Element;
  onEnter?: () => any;
  debug?: boolean;
  once?: boolean;
}

export default function Waypoint({ children, onEnter, debug, once }: WaypointProps) {
  let waypointRef: any = useRef(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(true);

  const childrenClassName = children?.props.className ? children.props.className + ' ' : '';

  const log = (str: string) => {
    if (debug) console.log(childrenClassName, ':', str);
  };

  const listener = (e?: Event) => {
    e && e.stopPropagation();
    if (waypointRef.current) {
      const { left, top, right, bottom } = waypointRef.current.getBoundingClientRect();
      const yes = left < clientWidth && right > 0 && top < clientHeight && bottom > 0;
      setInView(yes);
    }
  };

  useEffect(() => {
    log('Waypoint init');
    listener();
  }, []);

  useEffect(() => {
    if (active) {
      window.addEventListener('scroll', listener);
      window.addEventListener('touchmove', listener);
    }
    return () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('touchmove', listener);
    };
  }, [active]);

  useEffect(() => {
    log(`inView changing: ${inView ? 'in' : 'out'}`);
    if (inView) {
      log('onEnter triggers');
      onEnter && onEnter();
      once && setActive(false);
    }
  }, [inView]);

  if (active && isValidElement<any>(children)) {
    return cloneElement(children, {
      ref: waypointRef,
      className: childrenClassName + 'WaypointAnchor',
    });
  }

  return children;
}
