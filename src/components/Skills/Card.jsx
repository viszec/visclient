import { forwardRef } from "react";
import Image from "next/image";
import styles from './style.module.scss';

const Card = forwardRef(({ id, frontSrc, frontAlt, backText }, ref) => {
  return (
    <div className={`${styles.card} card`} id={id} ref={ref}>
      <div className={`${styles.cardWrapper} ${styles[`card-${id}`]}`}>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <Image
              priority
              src={frontSrc}
              width={400}
              height={500}
              alt={frontAlt}
            />
          </div>
          <div className={styles.flipCardBack}>
            <p>{backText}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
