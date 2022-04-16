const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

//defining classes in ORM
class GameSession extends Model {}
GameSession.init(
  {
    PlayerName: DataTypes.STRING,
    PlayedLetters: DataTypes.STRING,
    StartedAt: DataTypes.DATE,
    EndedAT: DataTypes.DATE,
  },
  { sequelize, modelName: "game_sessions" }
  //tabel name in database for this class -> game_session
);

class Word extends Model {}
Word.init(
  {
    title: DataTypes.STRING,
  },
  { sequelize, modelName: "words" }
);

//adding foreign key
GameSession.Word = GameSession.belongsTo(Word);

module.exports = {
  GameSession,
  Word,
  sequelize,
};
