const { Order, User, Location } = require("../db");
const { checkUuid } = require("../helpers/utils");

async function getLocations(req, res, next) {
  const { uuid } = req.query;
  if (uuid && checkUuid(uuid)) {
    try {
      const location = await Location.findOne({ where: { uuid } });
      if (location?.dataValues) {
        return res.json(location.dataValues);
      }
      return res.json({ message: "no hay sucursales cargadas" });
    } catch (error) {
      next(error);
    }
  }
  try {
    const locations = await Location.findAll();
    return await res.json(locations);
  } catch (error) {
    next(error);
  }
}

async function addLocation(req, res, next) {
  //body comes with Desc, Lat & Lng

  try {
    const newLocation = await Location.create(req.body);
    return res.json({ message: "Sucursal Agregada" });
  } catch (error) {
    next(error);
  }
}

async function deleteLocation(req, res, next) {
  const { uuid } = req.query;

  try {
    if (uuid) {
      await Location.destroy({ where: { uuid } });
      return res.json({ message: "Sucursal eliminada" });
    }
  } catch (error) {
    next(error);
  }
}

async function updateLocation(req, res, next) {
  const { uuid } = req.query;
  try {
    if (uuid && req.body) {
      const locationFound = await Location.findOne({ where: { uuid } });
      await locationFound.update(req.body);
      return res.json(locationFound);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLocations,
  addLocation,
  deleteLocation,
  updateLocation,
};
