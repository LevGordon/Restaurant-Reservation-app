const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const date = req.query.date
  const data = await service.list(date);
  res.json({ data });
}

function reservationIsInFuture(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const todaysDate = new Date();
  const submittedDate = new Date(`${reservation_time} ${reservation_date}`);
  if (submittedDate < todaysDate) {
    return next({
      status: 400,
      message: `Reservations must be placed in the future.`
    })
  }
  next();
}

// getDay returns a num 0-6 where 0 is Monday, 6 is Sunday
//validation check for 1 --> Tuesday
function isTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const dayNum = new Date(reservation_date).getDay();
  if (dayNum === 1) {
    return next({
      status: 400,
      message: `Sorry! We're closed on Tuesdays!`
    })
  }
  next();
}

// VALIDATION PIPELINE
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasRequiredFields(req, res, next) {
  const { data = {} } = req.body;

  try {
    VALID_PROPERTIES.forEach((property) => {
      if (!data[property]) {
        const error = new Error(`A '${property}' property is required.`);
        error.status = 400;
        throw error;
      }
    });
    next();
  } catch (error) {
    next(error);
  }
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter((field) => {
    console.log(field);
    if (field === "people") {
      return typeof field.value === "number"
    }
    return typeof field.value === "string"
  });
  console.log(invalidFields);
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

/* validation currently checking if:
    - req has all required fields
    - req has all valid entries of fields

*/
async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list,
  create: [
    hasRequiredFields,
    hasOnlyValidProperties,
    reservationIsInFuture,
    isTuesday,
    asyncErrorBoundary(create),
  ],
};