import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CardSetButton.module.css';

function CardSetButton({ cardSet }) {
  const obtainedCards = 0;
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    async function loadImage() {
      try {
        const image = await import(`../img/sets/${cardSet.set_code}.jpg`);
        setBackgroundImage(`url(${image.default})`);
      } catch (error) {
        const fallbackImage = await import('../img/sets/LART.jpg');
        setBackgroundImage(`url(${fallbackImage.default})`);
      }
    }

    loadImage();
  }, [cardSet.set_code]);

  const percentage = ((obtainedCards * 100) / cardSet.num_of_cards).toFixed(2);

  return (
    <div className={styles.cardset}>
      <Link
        className={styles.cardset_image}
        to={`/set/${cardSet.set_name}`}
        id={cardSet.set_code}
        style={{ backgroundImage }}
      >
        <span className={styles.cardset_name}>{cardSet.set_name}</span>
        <span className={styles.cardset_code}>{cardSet.set_code}</span>
      </Link>
      <div className={styles.cardset_bar_container}>
        <div
          className={styles.cardset_bar}
          style={{ width: `${percentage}%` }}
        >
        </div>
          <span className={styles.cardset_percent_text}>{percentage > 100 ? 'COMPLETE' : obtainedCards + "/" + cardSet.num_of_cards}</span>
      </div>
    </div>
  );
}

export default CardSetButton;
