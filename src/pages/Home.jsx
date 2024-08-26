import { useEffect, useState } from 'react';
import { getCardSets } from '../database/api';
import CardSetButton from '../components/CardSetButton';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [cardSetsList, setCardSetsList] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/set/' + e.target.elements.setCode.value);
  };

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
      {/* <form className={styles.inputBar} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        name="setCode"
        placeholder="Enter the set code"
      />
      <button className={styles.button} type="submit"></button>
    </form> */}
      <div className={styles.latestSets}>
        {cardSetsList.length > 0 && cardSetsList.map((element) => {
          return <CardSetButton cardSet={element}></CardSetButton>
        })}
      </div>
    </body>
  );
}

export default Home;
