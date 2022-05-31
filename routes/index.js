const scoreRouter = require('./score/score.controller');

module.exports = (app) => {
  app.use('/score', scoreRouter);
}