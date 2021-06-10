const { Review, User, Product } = require("../db");
const { checkUuid } = require("../helpers/utils");

async function createUser(req, res, next) {
  const { userName, email, password, isAdmin } = req.body; //true
  const passAdmin = "henry";
  try {
    const userNameExist = await User.findOne({
      where: { userName },
    });
    if (userNameExist) {
      return res.json({ message: "nombre de usuario ya existente" });
    }
    const emailExist = await User.findOne({
      where: { email },
    });
    if (emailExist) {
      return res.json({ message: "mail ya existente" });
    }
    if (isAdmin) {
      if (isAdmin === passAdmin) {
        const newUser = await User.create({
          userName,
          email,
          password,
          isAdmin: true,
        });
        return res.json({ message: "administrador creado" });
      } else {
        return res.json({ message: "clave de administrador invalida" });
      }
    } else {
      const newUser = await User.create({
        userName,
        email,
        password,
        isAdmin: false,
      });
      return res.json({ message: "usuario creado" });
    }
  } catch (error) {
    next(error);
  }
}

//trae todos los usuarios
async function getUsers(req, res, next) {
  try {
    const users = await User.findAll();
    const arrUsers = [];
    if (users.length) {
      for (element of users) {
        const values = element.dataValues;
        const objUser = {
          uuid: values.uuid,
          userName: values.userName,
          email: values.email,
          password: values.password,
          isAdmin: values.isAdmin,
        };
        arrUsers.push(objUser);
      }
    } else {
      return res.send("base de datos vacia");
    }
    res.json(arrUsers);
  } catch (error) {
    next(error);
  }
}

//actualiza datos de Un Usuario
async function updateUser(req, res, next) {
  const { uuid, userName, email, password, isAdmin } = req.body;
  const passAdmin = "henry";
  try {
    const toEditUser = await User.findOne({
      where: {
        uuid,
      },
    });
    console.log(toEditUser);
    if (toEditUser) {
      const userNameExist = await User.findOne({
        where: { userName },
      });
      if (userNameExist) {
        return res.json({ message: "el nombre de usuario ya existe" });
      }
      const emailExist = await User.findOne({
        where: { email },
      });
      if (emailExist) {
        return res.json({ message: "el mail ya existe" });
      } else {
        toEditUser.update(req.body);
        return res.status(200).json({ message: "Usuario Actualizado" });
      }
    }
    return res.status(400).json({ message: "Usuario no encontrado" });
  } catch (error) {
    next(error);
  }
}

//borra usuario
async function deleteUser(req, res, next) {
  const { uuid } = req.body;
  try {
    if (checkUuid(uuid)) {
      const toDestroy = await User.findOne({
        where: {
          uuid,
        },
      });
      if (toDestroy) {
        User.destroy({
          where: {
            uuid,
          },
        });
        res.status(200).send("Usuario eliminado");
      } else {
        res.status(404).send("No se encuentra el usuario a eliminar");
      }
    } else {
      res.status(404).send("Id invalido");
    }
  } catch (error) {
    next(error);
  }
}

//trae perfil del usuario
async function userProfile(req, res, next) {
  const { userUuid } = req.params;
  try {
    if (userUuid && checkUuid(userUuid)) {
      const userFound = await User.findOne({ where: { uuid: userUuid } });
      if (userFound) {
        return res.json(userFound);
      }
    }
    return res.status(400).json({ message: "Usuario Inexistente" });
  } catch (error) {
    next(error);
  }
}

//trae perfil del usuario
async function authUser(req, res, next) {
  const { email, password } = req.body;
  try {
    if (email) {
      const userFound = await User.findOne({ where: { email } });
      if (userFound.dataValues.password === password) {
        return res.json(userFound);
      } else {
        return res.status(400).json({ message: "Clave Invalida" });
      }
    }
    return res.status(400).json({ message: "Usuario Inexistente" });
  } catch (error) {
    next(error);
  }
}

//El usuario inicia sesion
async function login(req, res, next) {
  try {
    const { userName, email, password } = req.body;
    if (userName) {
      const userFoundName = await User.findOne({
        where: {
          userName,
        },
      });
      if (userFoundName) {
        if (password === userFoundName.password) {
          return res.json(userFoundName);
        }
      }
    }
    if (email) {
      const userFoundEmail = await User.findOne({
        where: {
          email,
        },
      });
      if (userFoundEmail) {
        if (password === userFoundEmail.password) {
          return res.json(userFoundEmail);
        }
      }
    }
    return res.status(404).json({ message: "El usuario no existe" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  userProfile,
  login,
  authUser,
};
