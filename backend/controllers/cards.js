const Card = require("../models/card");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate("likes")
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Datos inválidos"));
      }

      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError("Tarjeta no encontrada"))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "No tienes permiso para eliminar esta tarjeta",
        );
      }

      return Card.findByIdAndDelete(req.params.cardId).then(() =>
        res.send({ message: "Tarjeta eliminada correctamente" }),
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID inválido"));
      }

      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate("likes")
    .orFail(() => new NotFoundError("Tarjeta no encontrada"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID inválido"));
      }

      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate("likes")
    .orFail(() => new NotFoundError("Tarjeta no encontrada"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID inválido"));
      }

      return next(err);
    });
};
