const { Category } = require("../db");
const { Op } = require("sequelize");
const { checkUuid } = require("../helpers/utils");

async function getCategories(_req, res, next) {
  try {
    const categories = await Category.findAll();
    return await res.send(categories);
  } catch (error) {
    next(error);
  }
}

//create a category
async function createCategory(req, res, next) {
  try {
    const { name, image } = req.body;
    if (name) {
      const find = await Category.findOne({
        where: {
          name,
        },
      });
      if (find) {
        return res.status(200).send({ error: "Categoria existente" });
      }
      const category = await Category.create({
        name,
        image,
      });
      return res.status(200).send({
        message: `Categoria ${category.name} creada correctamente`,
        category: category,
      });
    } else {
      return res.status(500).send({ error: `Faltan datos` });
    }
  } catch (error) {
    next(error);
  }
}

//delete a category
async function deleteCategory(req, res, next) {
  const { uuid } = req.body; //BODY
  try {
    if (checkUuid(uuid)) {
      const toDestroy = await Category.findOne({
        where: {
          uuid: uuid,
        },
      });
      if (toDestroy) {
        Category.destroy({
          where: {
            uuid,
          },
        });
        res.status(200).send("categoria eliminada");
      } else {
        res.status(404).send("Categoria no encontrada");
      }
    } else {
      res.status(404).send("Invalido");
    }
  } catch (error) {
    next(error);
  }
}

//update or modify a category
async function updateCategory(req, res, next) {
  try {
    const { uuid } = req.body;
    if (checkUuid(uuid)) {
      const toEditCategory = await Category.findOne({
        where: {
          uuid,
        },
      });
      if (toEditCategory) {
        const category = await toEditCategory.update(req.body);
        return res.send("Categoria actualizada");
      } else {
        return res.send("no existe la categoria");
      }
    } else {
      return res.send("Id invalido");
    }
  } catch (error) {
    next(error);
  }
}

async function getCategoryByName(req, res, next) {
  try {
    const { name } = req.query;
    const categoryByName = await Category.findAll({
      attributes: ["uuid", "name", "image"],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    categoryByName.length
      ? res.send(categoryByName)
      : res
          .status(404)
          .send({ error: "No se encontraron categorias en la busqueda" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryByName,
};
