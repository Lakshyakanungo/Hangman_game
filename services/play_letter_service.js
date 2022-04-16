const MAX_LIVES = 6;

async function mark_game_completed(gameSession) {
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

  const isWon = actualWord_array.reduce(
    (prevVal, currVal) => prevVal && played_set.has(currVal),
    true //initial val
  );
  // console.log("isWON -->>>", isWon);
  if (lives == 0 || isWon) {
    gameSession.EndedAt = new Date();
    await gameSession.save();
  }
}

async function play_letter_service(gameSession, letter) {
  const updated_played_letters = gameSession.PlayedLetters + letter;
  gameSession.set({
    PlayedLetters: updated_played_letters,
  });
  await gameSession.save();
  await mark_game_completed(gameSession);
}

module.exports = play_letter_service;
