import { useEffect, useRef } from 'react';

import ImageTrail from '@components/ui/image-trail';

type ImageTrailProps = {
  items: string[];
  variant?: number;
};

export default function ImageTrailComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Add touchstart event to initialize for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      // Prevent default to avoid scrolling while interacting with the component
      e.preventDefault();

      // Use the MouseEvent directly as it works for both cases
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
        bubbles: true,
        cancelable: true,
      });

      containerRef.current?.dispatchEvent(mouseEvent);
    };

    containerRef.current.addEventListener('touchstart', handleTouchStart as EventListener);

    // Make sure container is properly interactive on mobile
    containerRef.current.style.touchAction = 'none';

    return () => {
      containerRef.current?.removeEventListener('touchstart', handleTouchStart as EventListener);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '500px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer', // Makes it more obvious that it's interactive
      }}
    >
      <ImageTrail
        key="image-trail"
        items={[
          'https://picsum.photos/id/287/300/300',
          'https://picsum.photos/id/1001/300/300',
          'https://picsum.photos/id/1025/300/300',
          'https://picsum.photos/id/1026/300/300',
          'https://picsum.photos/id/1027/300/300',
          'https://picsum.photos/id/1028/300/300',
          'https://picsum.photos/id/1029/300/300',
          'https://picsum.photos/id/1030/300/300',
          // ...
        ]}
        variant={1}
      />
    </div>
  );
}
