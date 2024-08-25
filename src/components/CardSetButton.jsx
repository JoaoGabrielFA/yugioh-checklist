import { Link } from 'react-router-dom';
import styles from './CardSetButton.module.css';

function CardSetButton({cardSet}) {
  const obtainedCards = 0;
  // console.log(cardSet)
  return (
    <Link className={styles.card} to={`/set/${cardSet.set_name}`}id={cardSet.set_code}>
      <span>{cardSet.set_code}</span>
      <span>{cardSet.set_name}</span>
      <span>{obtainedCards}/{cardSet.num_of_cards} - {((obtainedCards*100)/cardSet.num_of_cards).toFixed(2)}%</span>
    </Link>
  )
}

export default CardSetButton;