const { Category, Product, Review, User } = require("../db");
const { checkUuid, productCategory } = require("../helpers/utils");
const { Op } = require("sequelize");

async function getProducts(req, res, next) {
  try {
    const dbProducts = await Product.findAll();
    const arrProducts = [];
    if (dbProducts.length) {
      for (element of dbProducts) {
        const values = element.dataValues;
        let arrCategories = await productCategory(values.uuid);
        const objProduct = {
          uuid: values.uuid,
          name: values.name,
          description: values.description,
          image: values.image,
          thumbnail: values.thumbnail,
          price: values.price,
          stock: values.stock,
          categories: arrCategories,
        };
        arrProducts.push(objProduct);
      }
    } else {
      return res.send("base de datos vacia");
    }
    res.json(arrProducts);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  const { name, description, image, price, stock, categories } = req.body;
  try {
    const exist = await Product.findOne({ where: { name } });
    if (exist) {
      return res.status(400).json({ message: "Producto ya existente" });
    }
    const newProduct = await Product.create({
      name,
      description,
      image,
      price,
      stock,
    });
    //en category me pusheo el nombre de la categoria que hay en el array CATEGORIES
    for (eachCategory of categories) {
      const categoryToAdd = await Category.findOne({
        //Recibir arreglos de uuid y armarlo con eso
        where: { name: eachCategory },
      });
      newProduct.addCategory(categoryToAdd);
    }
    res.status(200).json({ message: "Producto Agregado!" });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  // Editamos el producto aún teniendo el mismo id
  try {
    const { uuid } = req.body;
    if (checkUuid(uuid)) {
      const toEditProduct = await Product.findOne({
        where: {
          uuid,
        },
      });
      if (toEditProduct) {
        toEditProduct.update(req.body); //HAY QUE ESTAR SEGURO DE QUE LLEGA UN UUID
        return res.status(200).send("Producto Actualizado");
      } else {
        return res.status(400).send("Producto no encontrado");
      }
    } else {
      return res.status(500).send("Id Invalido");
    }
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  //Borramos producto llamandolo por su id
  const { uuid } = req.body;
  try {
    if (checkUuid(uuid)) {
      const toDestroy = await Product.findOne({
        where: {
          uuid,
        },
      });
      if (toDestroy) {
        Product.destroy({
          where: {
            uuid,
          },
        });
        res.status(200).send("Producto eliminado");
      } else {
        res.status(404).send("no se encuentra el producto a eliminar");
      }
    } else {
      res.status(404).send("id invalido");
    }
  } catch (error) {
    next(error);
  }
}

async function getProductDetail(req, res, next) {
  //Traemos el detalle del producto llamandolo por su id
  try {
    const { uuid } = req.params;
    // ↓↓↓ Validación ↓↓↓↓
    if (uuid && checkUuid(uuid)) {
      const product = await Product.findOne({
        where: {
          uuid,
        },
        include: [{ model: Review }],
      });
      if (product) {
        const values = product.dataValues;
        let organizedReviews = []; //[ { userName: ramon, text: "info"  }, { }  ]
        for (let element of values.reviews) {
          const user = await User.findOne({
            where: {
              uuid: element.userUuid,
            },
          });
          const userName = await user.dataValues.userName;
          organizedReviews.push({
            userName,
            text: element.text,
          });
        }
        let arrCategories = await productCategory(values.uuid);
        const objProduct = {
          uuid: values.uuid,
          name: values.name,
          description: values.description,
          image: values.image,
          price: values.price,
          stock: values.stock,
          categories: arrCategories,
          reviews: organizedReviews,
        };
        return res.status(200).json(objProduct);
      } else {
        res.status(404).send("no encontrado");
      }
    } else {
      res.status(500).send("id invalido");
    }
  } catch (error) {
    next(error);
  }
}

//productsByCategory
async function productsByCategory(req, res, next) {
  const { uuid } = req.query;
  try {
    let products = await Product.findAll({
      //attributes: { include: ["categories"] },
      include: {
        model: Category,
        where: {
          uuid,
        },
      },
    });
    let toSendProducts = [];
    for (product of products) {
      const objProduct = {
        uuid: product.dataValues.uuid,
        name: product.dataValues.name,
        description: product.dataValues.description,
        image: product.dataValues.image,
        thumbnail: product.dataValues.thumbnail,
        price: product.dataValues.price,
        stock: product.dataValues.stock,
      };
      toSendProducts.push(objProduct);
    }
    if (toSendProducts.length) {
      return res.send(toSendProducts);
    } else {
      return res.json({ message: "No hay Productos con esa Categoria" });
    }
  } catch (error) {
    next(error);
  }
}

async function searchProduct(req, res, next) {
  const { name } = req.query;
  try {
    const all = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return all.length > 0
      ? res.json(all)
      : res.json({ message: "No hubo coincidencia alguna en la busqueda" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductDetail,
  createProduct,
  deleteProduct,
  updateProduct,
  productsByCategory,
  searchProduct,
};
