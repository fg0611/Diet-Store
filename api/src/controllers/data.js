var data = {
  uuid: "8351e84d-6f4a-4708-b8a9-ca3141f809be",
  userName: "Administrador",
  email: "administrador@gmail.com",
  password: "henry",
  isAdmin: true,
};

var product = {
  uuid: "9ec70c49-0d59-42d4-9f81-0ace7fef0830",
  name: "vit k",
  description: "sups",
  image: [
    "https://www.crhoy.com/wp-content/uploads/2014/11/suplementos-medicamentos.jpg",
  ],
  thumbnail: [
    "https://www.crhoy.com/wp-content/uploads/2014/11/suplementos-medicamentos.jpg",
  ],
  price: 123,
  stock: 0,
  categories: ["sups"],
};

var order = {
  userName: "fran",
  products: [{ name: "vit c", quantity: 10 }],
};

for (e of order.products) {
  console.log(e.name);
}
