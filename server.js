const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

//
// controllers
//
const { UserController } = require("./controllers/UserController");
const { CompanyController } = require("./controllers/CompanyController");
const { ProductController } = require("./controllers/ProductController");
const { SellController } = require("./controllers/SellController");

//
// middleware
//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

//
// sell
//
app.post("/api/sell/create", SellController.create);

//
// buy
//
app.post("/api/buy/create", ProductController.create);
app.get("/api/buy/list", ProductController.list);
app.put("/api/buy/update/:id", ProductController.update);
app.delete("/api/buy/remove/:id", ProductController.remove);

//
// user
//
app.post("/api/user/signin", UserController.signIn);
app.get("/api/user/info", UserController.info);
app.put("/api/user/update", UserController.update);

//
// company
//
app.post("/api/company/create", CompanyController.create);
app.get("/api/company/list", CompanyController.list);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
