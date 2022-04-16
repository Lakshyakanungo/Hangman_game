const sequelize = require("sequelize");
const { Word, GameSession } = require("../../models");
const {
  serialiseGameSession,
} = require("./serialisers/game_session_serialiser.js");
const play_letter_service = require("../../services/play_letter_service");
async function CreateSession(req, res) {
  const name = req.body.name;
  const word = await Word.findOne({
    order: sequelize.fn("RANDOM"),
  });
  console.log(name, word);
  const gameSession = await GameSession.create({
    PlayerName: name,
    PlayedLetters: "",
    StartedAt: new Date(), //current date in nodejs
    wordId: word.id,
  });
  //TODO: we'll do something with the name
  res.json(await serialiseGameSession(gameSession));
}

async function PlaySession(req, res) {
  const letter = req.body.letter;
  const gameID = req.params.id;

  console.log(letter);
  console.log(gameID);
  //TODO: we'll do something with the letter
  const gameSession = await GameSession.findByPk(gameID);
  await play_letter_service(gameSession, letter);
  res.json(await serialiseGameSession(gameSession));
}

module.exports = {
  CreateSession,
  PlaySession,
};
