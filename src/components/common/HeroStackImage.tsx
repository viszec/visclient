import { useEffect, useState } from 'react';

import Image from 'next/image';

import { motion, useMotionValue, useTransform } from 'framer-motion';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  randomRotation = true,
  sensitivity = 300,
  cardDimensions,
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}: StackProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Based on breakpoints, set different sizes
  const getResponsiveDimensions = () => {
    if (windowWidth >= 1680) {
      // 2xl
      return { width: 300, height: 210 };
    } else if (windowWidth >= 1440) {
      // xl
      return { width: 300, height: 210 };
    } else if (windowWidth >= 1281) {
      // lg
      return { width: 280, height: 180 };
    } else if (windowWidth >= 1025) {
      // md
      return { width: 240, height: 160 };
    } else {
      // sm and smaller
      return { width: 240, height: 160 };
    }
  };

  // Use the provided size or responsive size
  const responsiveDimensions = cardDimensions || getResponsiveDimensions();

  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          { id: 1, img: '/images/gif/belc.gif?q=80&w=500&auto=format' },
          { id: 2, img: '/images/gif/nestease.gif?q=80&w=500&auto=format' },
          { id: 3, img: '/images/gif/palettepicker.gif?q=80&w=500&auto=format' },
          { id: 4, img: '/images/gif/opcc.gif?q=80&w=500&auto=format' },
        ]
  );

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: responsiveDimensions.width,
        height: responsiveDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation
          ? Math.random() * 10 - 5 // Random degree between -5 and 5
          : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="rounded-xl border border-[#333]/40 overflow-hidden"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%',
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: responsiveDimensions.width,
                height: responsiveDimensions.height,
              }}
            >
              <Image
                src={card.img}
                alt={`card-${card.id}`}
                className="w-full h-full object-cover pointer-events-none"
                width={100}
                height={100}
                loading="lazy"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
