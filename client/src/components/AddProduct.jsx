import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createProduct } from "../redux/actions/productActions.js";
import { getCategories } from "../redux/actions/categoryActions";
import { sweetAlert } from "../helpers/utils";

/* {
  "name": "vit z",
  "description": "sups",
  "image": ["https://www.crhoy.com/wp-content/uploads/2014/11/suplementos-medicamentos.jpg"],
  "thumbnail": ["https://www.crhoy.com/wp-content/uploads/2014/11/suplementos-medicamentos.jpg"],
  "price": 123,
  "stock": 0,
  "categories": ["suplementos"]
} */

export default function AddProduct() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const categories = store.categories.categories;
  const loading = store.products.loading;
  const agregado = store.products.message;

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [datos, setDatos] = useState({
    name: "",
    description: "",
    image: [],
    thumbnail: [],
    price: "",
    stock: "",
    categories: [],
    url: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const handleCat = (event) => {
    event.preventDefault();
    const options = event.target.options;
    const seleccionadas = [];
    for (let option of options) {
      if (option.selected) {
        seleccionadas.push(option.value);
      }
    }
    setDatos({
      ...datos,
      categories: seleccionadas,
    });
  };

  const handleImgs = (event) => {
    event.preventDefault();
    if (datos.image.includes(datos.url)) {
      sweetAlert(
        "Atención",
        "La Url que intentas añadir ya existe",
        "warning",
        "OK",
        5000
      );
      return;
    } else {
      setDatos({
        ...datos,
        image: [...datos.image, datos.url],
        thumbnail: [...datos.thumbnail, datos.url],
      });
    }
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    dispatch(createProduct(datos));
    sweetAlert(
      "Atención",
      "Producto Agregado a la Base de Datos",
      "success",
      "OK",
      5000
    );
  };

  if (loading) {
    return (
      <div>
        <h1> LOADING... </h1>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={enviarDatos}>
          <div>
            <section>
              <input
                type="text"
                placeholder="Nombre"
                name="name"
                onChange={handleInputChange}
              />
            </section>
            <section>
              <input
                type="text"
                placeholder="Descripción"
                name="description"
                onChange={handleInputChange}
              />
            </section>
            <section>
              $
              <input
                type="number"
                placeholder="Precio"
                name="price"
                onChange={handleInputChange}
              />
            </section>
            <section>
              <input
                type="number"
                placeholder="Stock"
                name="stock"
                onChange={handleInputChange}
              />
            </section>
          </div>
          <div>
            <label>Imagenes del Producto:</label>
            <section>
              <input
                type="text"
                placeholder="Inserta Urls"
                name="url"
                onChange={handleInputChange}
              />
              <button onClick={handleImgs}>Insertar Url</button>
            </section>
          </div>
          <select multiple name="categories" onChange={handleCat} required>
            {categories?.map((each) => {
              return (
                <option value={each.name} key={each.uuid}>
                  {each.name}
                </option>
              );
            })}
          </select>
          <input type="submit" value="Agregar" />
          <div>{agregado.message}</div>
        </form>
      </div>
    );
  }
}
