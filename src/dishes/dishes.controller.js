// Import necessary libraries and data
const path = require("path");
const dishes = require(path.resolve("src/data/dishes-data"));
const nextId = require("../utils/nextId");


// Middleware to check if request has all required fields for a dish
function hasRequiredFields(req, res, next) {
  // Destructure fields from request body
  const { data: { name, description, price, image_url } = {} } = req.body;
 // I create an array called "validation", list of rules that are applied to the incoming request. Each object in the array represents a single validation rule that checks whether a specific field (property) of the request has a valid value.
  const validations = [
    {
      // for example --- if the name value is missing ( value => value && value.length > 0,)we would print out the error message "Dish must include a name", its sent in the response if the validation fails.
      property: "name",
      value: name,
      validation: value => value && value.length > 0,
      message: "Dish must include a name",
    },
    {
      property: "description",
      value: description,
      validation: value => value && value.length > 0,
      message: "Dish must include a description",
    },
    {
      property: "price",
      value: price,
      validation: value => Number.isInteger(value) && value > 0,
      message: "Dish must have a price that is an integer greater than 0",
    },
    {
      property: "image_url",
      value: image_url,
      validation: value => value && value.length > 0,
      message: "Dish must include an image_url",
    },
  ];
 // Iterate over validations and perform each one
  for (const { property, value, validation, message } of validations) {
    if (!validation(value)) {
      return next({ status: 400, message });
    }
  }
// Middleware to check if dish exists
  next();
}

function dishExists(req, res, next) {
  const { dishId } = req.params;
  const foundDish = dishes.find((dish) => dish.id === dishId);
  if (foundDish) {
    res.locals.dish = foundDish;
    next();
  }
  // If dish is not found, respond with error
  else {
    next({
      status: 404,
      message: `Dish id not found: ${dishId}`,
    });
  }
}

// Middleware checks if the ID in the request body matches the ID in the route parameters
function idMatches(req, res, next) {
  const { dishId } = req.params;
  const { data: { id } = {} } = req.body;

  if (!id || id === dishId) {
    next();
  } else {
    next({
      status: 400,
      message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`,
    });
  }
}
// Handler functions for list, read, create, and update operations are defied 
// The read and update handler functions use the dish stored in res.locals by the dishExists middleware

function list(req, res) {
  res.json({ data: dishes });
}
// Respond with the dish stored in res.locals by the dishExists middleware
function read(req, res) {
  res.json({ data: res.locals.dish });
}

// Create new dish and respond with it
function create(req, res) {
  const { data: { name, description, price, image_url } = {} } = req.body;
  const newDish = {
    id: nextId(),
    name,
    description,
    price,
    image_url,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}


 // Update dish stred in res.locals by the dishExists midleware and respond with it
function update(req, res) {
  const dish = res.locals.dish;
  const { data: { name, description, price, image_url } = {} } = req.body;
  dish.name = name;
  dish.description = description;
  dish.price = price;
  dish.image_url = image_url;
  res.json({ data: dish });
}

module.exports = {
  list,
  read: [dishExists, read],
  create: [hasRequiredFields, create],
  update: [dishExists, idMatches, hasRequiredFields, update],
};