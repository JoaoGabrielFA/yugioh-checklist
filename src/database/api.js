const api_base = "https://db.ygoprodeck.com/api/v7/";

export const getCardSets = async () => {
  try {
    const data = await fetch(`${api_base + "cardsets.php"}`).then(resp => resp.json());
    const datas = []
    for (let i = 0; i < 100; i++) {
      datas.push(data[i]);
    }
    return datas;
  } catch (error) {
    console.log('ERROR: ' + error);
    return [];
  }
}

export const getAllCardsFromSet = async (cardSetName) => {
  try {
    const cards = await fetch(`${api_base + "cardinfo.php?language=pt&cardset=" + cardSetName}`).then(resp => resp.json());
    return cards;
  } catch (error) {
    console.log(error)
    return [];
  }
}