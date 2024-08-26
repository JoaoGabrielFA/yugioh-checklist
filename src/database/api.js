const api_base = "https://db.ygoprodeck.com/api/v7/";

export const getCardSets = async () => {
  try {
    const data = await fetch(`${api_base + "cardsets.php"}`).then(resp => resp.json());
    const sortedData = data.sort((a, b) => new Date(b.tcg_date) - new Date(a.tcg_date));
    const datas = sortedData.slice(0, 4);
    return datas;
  } catch (error) {
    console.log('ERROR: ' + error);
    return [];
  }
}

export const getAllCardsFromSet = async (cardSetName) => {
  try {//language=pt&
    const cards = await fetch(`${api_base + "cardinfo.php?cardset=" + cardSetName}`).then(resp => resp.json());
    return cards;
  } catch (error) {
    console.log(error)
    return [];
  }
}