const { Review, User, Product, Order, Orderline } = require("../db");
const { checkUuid } = require("../helpers/utils");

async function createReview(req, res, next) {
  try {
    const { productUuid, email, text, rating } = req.body;
    const userReviewing = await User.findOne({
      where: {
        email,
      },
    });
    let userUuid = userReviewing.dataValues.uuid;
    const userOrders = await Order.findAll({ where: { userUuid } });
    //console.log("BY ORDER STATUS:::::", reviewByOrderStatus);

    if (userOrders.length > 0) {
      //console.log("reviewByOrderStatus");
      for (let order of userOrders) {
        const values = order.dataValues;
        if (
          /* values.shippingState === "processing" ||
          values.shippingState === "completed" */
          values.orderState === "processing"
        ) {
          const orderLines = await Orderline.findAll({
            where: { orderUuid: values.uuid },
          });
          for (let line of orderLines) {
            const values = line.dataValues;
            if (values.productUuid === productUuid) {
              const productPerLine = await Product.findOne({
                where: {
                  uuid: productUuid,
                },
                include: [{ model: Review }],
              });
              //return res.json(productPerLine);
              if (userReviewing && productPerLine) {
                for (let review of productPerLine.dataValues.reviews) {
                  if (review.userUuid === userUuid) {
                    return res.status(200).json({
                      message: "Ya has comentado sobre este producto",
                    });
                  }
                }
                await Review.create({
                  text,
                  userUuid,
                  productUuid,
                  rating: parseInt(rating),
                });
                res.status(200).json({ message: "Gracias por su comentario" });
              } else {
                return res
                  .status(400)
                  .json({ message: "No puede comentar sobre este producto" });
              }
            }
          }
        }
      }
    } else {
      return res
        .status(404)
        .json({ message: "No puede comentar sobre este producto" });
    }
  } catch (error) {
    next(error);
  }
}

async function getReviewsByProduct(req, res, next) {
  try {
    const { productUuid } = req.params;

    if (checkUuid(productUuid)) {
      const productReviews = await Review.findAll({
        where: {
          productUuid,
        },
      });
      if (productReviews && productReviews.length) {
        let organizedReviews = [];
        for (let review of productReviews) {
          const values = review.dataValues;
          const user = await User.findOne({ where: { uuid: values.userUuid } });
          organizedReviews.push({
            text: values.text,
            user: user.dataValues.userName,
            rating: values.rating,
          });
        }
        res.status(200).json(organizedReviews);
      } else {
        res
          .status(400)
          .json({ message: "Este Producto no tiene Reviews de momento" });
      }
    } else {
      res.status(400).json({ message: "Id inexistente" });
    }
  } catch (error) {
    next(error);
  }
}

async function updateReview(req, res, next) {
  try {
    const { uuid } = req.body; // review a modificar
    if (checkUuid(uuid)) {
      const reviewToEdit = await Review.findOne({
        where: {
          uuid: uuid,
        },
      });
      if (reviewToEdit) {
        reviewToEdit.update(req.body); // cambiamos el text
        res.status(200).json({ message: "Comentario Actualizado" });
      } else {
        res.status(400).json({ message: "No se ha podido Actualizar" });
      }
    } else {
      res.status(400).json({ message: "Id inexistente" });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const { uuid } = req.body;
    if (checkUuid(uuid)) {
      const toDestroy = await Review.findOne({
        where: {
          uuid,
        },
      });
      if (toDestroy) {
        Review.destroy({
          where: {
            uuid,
          },
        });
        res.status(200).json({ message: "Comentario eliminado" });
      } else {
        res
          .status(404)
          .json({ message: "No se encuentra el comentario a eliminar" });
      }
    } else {
      res.status(400).json({ message: "Id inexistente" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
};
