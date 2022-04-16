const MAX_LIVES = 6;

async function serialiseGameSession(gameSession) {
  //calculating lives left
  const gameSessionWord = await gameSession.getWord(); //returns a Word object
  const actualWord = gameSessionWord.title; //string
  const actualWord_array = actualWord.split(""); //array
  const PlayedLetters = gameSession.PlayedLetters; //string
  const Played_array = PlayedLetters.split(""); //array
  const word_set = new Set([...actualWord_array]);
  const played_set = new Set([...Played_array]);

  const wrong_letters = Played_array.filter((letter) => {
    return !word_set.has(letter);
  });
  const wrong_set = new Set([...wrong_letters]);
  const lives = MAX_LIVES - wrong_set.size;

  //calculating masked word
  const maskedWord = actualWord_array.map((letter) => {
    return played_set.has(letter) ? letter : "_";
  });

  return {
    id: gameSession.id,
    livesLeft: lives,
    result: !!gameSession.EndedAt,
    maskedWord: maskedWord,
  };
}

module.exports = { serialiseGameSession };
