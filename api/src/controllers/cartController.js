const { Cart } = require("../db");
const { Op } = require("sequelize");
const { checkUuid } = require("../helpers/utils");

async function createOrUpdateCart(req, res, next) {
  try {
    const { uuid, items } = req.body;

    if (uuid && checkUuid(uuid)) {
      const cart = await Cart.findOne({ where: { uuid } });
      if (cart) {
        const modifiedCart = await cart.update(items);
        return res.send(modifiedCart);
      }
    } else if (items) {
      const newCart = await Cart.create({
        uuid,
        items,
      });
      return res.send(newCart);
    } else {
      return res.status(404).send({ error: "El Carrito No Existe" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrUpdateCart,
};
