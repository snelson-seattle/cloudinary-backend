const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const sequelize = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const hbs = exphbs.create({});


// Configure view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Apply body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make public assets directory available
app.use(express.static(path.join(__dirname, "public")));

// Add request routing
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database connection successful.");
  app.listen(PORT, () => console.log(`Listening for requests on port ${PORT}`));
});
