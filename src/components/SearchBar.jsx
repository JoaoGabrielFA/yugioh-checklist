import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { findCardSet } from '../database/api';
import CardSetButton from './CardSetButton';

function SearchBar() {

  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults(await findCardSet(e.target.elements.setCode.value));
    console.log(await findCardSet(e.target.elements.setCode.value))
  };

  return (
    <>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="setCode"
          placeholder="Enter the set code or name"
        />
        <button className={styles.button} type="submit"></button>
      </form>
      <div style={{display: 'flex', width: '80%', margin: 'auto', justifyContent: 'center', gap: '10px'}}>
        {results.length > 0 && results.map((element) => {
          return <CardSetButton cardSet={element}></CardSetButton>
        })}
      </div>
    </>
  )
}

export default SearchBar;