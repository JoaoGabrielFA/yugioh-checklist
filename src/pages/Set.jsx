import styles from './Set.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCardsFromSet } from '../database/api';

function Set() {
  const { set } = useParams();
  const [cards, setCards] = useState([]);
  const [cardsOwneds, setCardsOwneds] = useState(
    JSON.parse(localStorage.getItem('yugioh_checklist'))?.find(entry => entry.hasOwnProperty(set))?.[set] || []
  );

  const findSet = (card_sets) => {
    const foundSet = card_sets.find(element => element.set_name === set);
    return foundSet ? foundSet.set_code : 'Set not found';
  };

  const cardColor = (type) => {
    switch(type){
      case 'normal': return 'burlywood';
      case 'effect': return 'saddlebrown';
      case 'spell': return 'darkgreen';
      case 'trap': return 'darkmagenta';
      case 'fusion': return 'darkslateblue';
      case 'ritual': return 'darkblue';
      case 'link': return 'blue';
      case 'xyz': return 'black';
      case 'synchro': return 'lightgrey';
      case 'effect_pendulum': return 'linear-gradient(to right, saddlebrown, darkgreen)';
      case 'normal_pendulum': return 'linear-gradient(to right, burlywood, darkgreen)';
      default: return 'grey';
    }
  };

  const verificarCheckbox = (event) => {
    const checklist = JSON.parse(localStorage.getItem('yugioh_checklist')) || [];
    const checkbox = event.target;
    const cardName = checkbox.name;

    let setEntry = checklist.find(entry => entry.hasOwnProperty(set));
    if (!setEntry) {
      setEntry = { [set]: [] };
      checklist.push(setEntry);
    }

    if (checkbox.checked) {
      setEntry[set].push(cardName);
    } else {
      setEntry[set] = setEntry[set].filter(name => name !== cardName);
    }

    localStorage.setItem('yugioh_checklist', JSON.stringify(checklist));
    setCardsOwneds(setEntry[set]);
  };

  useEffect(() => {
    getAllCardsFromSet(set).then((resp) => {
      setCards(resp.data);
    });
  }, [set]);

  return (
    <div className={styles.set}>
      {cards.length > 0 && cards.map((element) => {
        const cardSetCode = findSet(element.card_sets);
        return (
          <div key={cardSetCode} className={styles.card} style={{ background: cardColor(element.frameType) }}>
            <input 
              type="checkbox" 
              checked={cardsOwneds.includes(cardSetCode)} 
              name={cardSetCode} 
              onChange={verificarCheckbox} 
            />
            <span>{cardSetCode} - {element.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Set;