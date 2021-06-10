const { Category, product_category, Product } = require("../db");

const checkUuid = (uuid) => {
  const uuidSplit = uuid.split("-");
  return uuid.length === 36 && uuidSplit.length === 5;
};

// ↓ funcion para traer la relacion ↓
const productCategory = async (idProduct) => {
  console.log(idProduct);
  let relation = await product_category.findAll({
    where: {
      productUuid: idProduct,
    },
  });
  const categoryArray = [];
  for (element of relation) {
    let category = await Category.findOne({
      where: {
        uuid: element.dataValues.categoryUuid,
      },
    });
    categoryArray.push(category.dataValues.name);
  }
  return categoryArray;
};

module.exports = {
  checkUuid,
  productCategory,
};
