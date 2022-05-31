const joi = require('joi')
const createHttpError = require('http-errors')

const addScoreDTO = joi.object().keys({
  gameId: joi.string().required(),
  userId: joi.string().required(),
  score: joi.number().required(),
});

const deleteScoreDTO = joi.object({
  userId: joi.string().required(),
});

const updateScoreDTO = joi.object().keys({
  userId: joi.string().required(),
  score: joi.number().required(),
});

const scoreDTOValidator = (validator) => {
  return async function (req, res, next) {
    try {
      const validatedBody = await validator.validateAsync(req.body)
      req.body = validatedBody
      next()
    } catch (err) {
      if (err.isJoi) {
        return next(createHttpError(422, { message: err.message }))
      }
      next(createHttpError(500))
    }
  }
}

module.exports = {
  addScoreDTO,
  deleteScoreDTO,
  updateScoreDTO,
  scoreDTOValidator
}