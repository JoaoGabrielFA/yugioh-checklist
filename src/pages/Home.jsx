import { useEffect, useState } from 'react';
import { getCardSets } from '../database/api';
import CardSetButton from '../components/CardSetButton';
import styles from './Home.module.css';
import SearchBar from '../components/SearchBar';

function Home() {
  const [cardSetsList, setCardSetsList] = useState([]);

  useEffect(() => {
    getCardSets().then((resp) => {
      setCardSetsList(resp);
    })
  }, [])

  return (
    <body className={styles.home}>
      <div className={styles.title}>
        <span className={styles.mainTitle}>Yu-Gi-Oh!</span>
        <span className={styles.subTitle}>CHECKLIST</span>
      </div>
      <SearchBar />
      <div className={styles.latestSets}>
        <span className={styles.latestSets_title}>LATEST SETS</span>
        <div className={styles.latestSets_cards}>
          {cardSetsList.length > 0 && cardSetsList.map((element) => {
            return <CardSetButton cardSet={element}></CardSetButton>
          })}
        </div>
      </div>
    </body>
  );
}

export default Home;
