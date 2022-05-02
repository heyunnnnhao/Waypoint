import { useState, useEffect, useRef, cloneElement, isValidElement } from 'react';

const clientHeight = window.innerHeight;
const clientWidth = window.innerWidth;

export interface WaypointProps {
  children?: JSX.Element | undefined | null;
  onEnter?: () => any;
  onLeave?: () => any;
  debug?: boolean;
  once?: boolean;
  topOffset?: number;
  uid?: number;
}

export default function Waypoint({ children, onEnter, onLeave, debug, once, topOffset = 0, uid }: WaypointProps): any {
  const waypointRef: any = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(true);

  const childrenClassName = children?.props.className ? children.props.className + ' ' : '';

  const log = (str: string) => {
    if (debug) console.log(childrenClassName, uid || '', ':', str);
  };

  const listener = (e?: Event) => {
    e && e.stopPropagation();
    if (waypointRef.current) {
      const { left, top, right, bottom } = waypointRef.current.getBoundingClientRect();
      const yes = left < clientWidth && right > 0 && top < clientHeight && bottom > topOffset;
      setInView(yes);
    }
  };

  useEffect(() => {
    log(`Waypoint init - ${uid} - ${topOffset}px topOffset - ${once ? 'once' : 'repeat'}`);
    listener();
  }, []);

  useEffect(() => {
    if (!hasEntered) {
      document.addEventListener('scroll', listener);
      document.addEventListener('touchmove', listener);
    }
    return () => {
      document.removeEventListener('scroll', listener);
      document.removeEventListener('touchmove', listener);
    };
  }, [hasEntered, listener]);

  useEffect(() => {
    log(`inView changing: ${inView ? 'in' : 'out'}`);
    if (inView) {
      log('onEnter triggers');
      onEnter && onEnter();
      setHasEntered(true);
    } else if (!inView && hasEntered) {
      log('onLeave triggers');
      onLeave && onLeave();
    }
  }, [inView]);

  if (!children) console.error('Waypoint requires a child element');

  if (once && hasEntered) return children;

  if (!(once && hasEntered) && isValidElement<any>(children)) {
    return cloneElement(children, {
      ref: waypointRef,
      className: childrenClassName + 'WaypointAnchor',
    });
  }

  return children;
}
