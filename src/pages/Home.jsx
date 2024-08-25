import { useEffect, useState } from 'react';
import { getCardSets } from '../database/api';
import CardSetButton from '../components/CardSetButton';
import styles from './Home.module.css';

function Home() {
  const [cardSetsList, setCardSetsList] = useState([]);
  
  useEffect(() => {
    getCardSets().then((resp) => {
      setCardSetsList(resp);
      console.log(cardSetsList);
    })
  }, [])

  return (
    <body className={styles.home}>
      {cardSetsList.length > 0 && cardSetsList.map((element) => {
        return <CardSetButton cardSet={element}></CardSetButton>
      })}
    </body>
  );
}

export default Home;
