import styles from './Set.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCardsFromSet } from '../database/api';

function Set() {
  const { set } = useParams();
  const [cards, setCards] = useState([]);

  const findSet = (card_sets) => {
    const foundSet = card_sets.find(element => element.set_name === set);
    return foundSet ? foundSet.set_code : 'Set not found';
  }

  useEffect(() => {
    getAllCardsFromSet(set).then((resp) => {
      setCards(resp.data);
      console.log(resp.data);
    })
  }, [set])

  return (
    <div className={styles.set}>
      {cards.length > 0 && cards.map((element) => {
        return (
          <span>{findSet(element.card_sets)} - {element.name}</span>
        )
      })}
    </div>
  );
}

export default Set;