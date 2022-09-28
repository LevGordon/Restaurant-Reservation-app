const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  if (req.query.mobile_number) {
    const data = await service.search(req.query.mobile_number);
    res.json({ data });
  } else {
    const data = await service.list(req.query.date);
    res.json({ data });
  }
}



// VALIDATION PIPELINE

function reservationExists(req, res, next) {
  service.read(req.params.reservation_id)
  .then((reservation) => {
  if (reservation) {
   res.locals.reservation = reservation
   return next()
  }
  next({status: 404, message: `Reservation ID of ${req.params.reservation_id} cannot be found.`})
}).catch(next) 
}

function read(req, res) {
   const {reservation: data} = res.locals;
   res.json({data})
}

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
  const { data = {} } = req.body.data;

  const invalidFields = Object.keys(data).filter((field) => {
    if (field === "people") {
      return typeof field.value === "number"
    }
    return typeof field.value === "string"
  });
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
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
  const dayNum = new Date(reservation_date).getUTCDay();
  if (dayNum === 2) {
    return next({
      status: 400,
      message: `Sorry! We're closed on Tuesdays!`
    })
  }
  next();
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

function dateValidator(req, res, next) {
  const { data = {} } = req.body;
  if (!data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/)) {
    return next({
      status: 400,
      message: `invalid reservation_date`,
    });
  }
  next();
}

function timeValidator(req,res,next) {
  const { data = {} } = req.body;
  if (!data["reservation_time"].match(/[0-9]{2}:[0-9]{2}/)) {
    return next({
      status: 400,
      message: `invalid reservation_time `,
    });
  }
  next();
}

function peopleIsNumber(req, res, next) {
  const { data = {} } = req.body;
  if (typeof data["people"] != "number") {
    return next({
      status: 400,
      message: `"people" field must be a number `,
    });
  }
  next();
}

function reservationWithinOperatingHours(req,res,next) {
  const { data = {} } = req.body;
  let submittedTime =data["reservation_time"].replace(":", "");
  if (submittedTime < 1030 || submittedTime > 2130) {
    next({
      status: 400,
      message: "Reservation must be within business hours and at least an hour before close",
    });
  }
  next();
}

function reservationStatus(req, res, next) {
  const { status } = req.body.data;
  if (status === "seated" || status === "finished" || status === "unknown") {
    return next({
      status: 400,
      message: `Error: Reservation status cannot be booked. Status is: ${status}`
    })
  }
  next();
}

function unknownStatus(req, res, next) {
  const { data = {} } = req.body;
  if (data["status"] === "unknown") {
    return next({
      status: 400,
      message: `unknown status`
    })
  }
  next();
}

function isValueFinished(req, res, next) {
  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: `a finished reservation cannot be updated`
    })
  }
  next();
}

async function update(req, res, next) {
  const newReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(res.locals.reservation.reservation_id);
  res.status(200).json({ data: newReservation });
}

async function updateReservation(req, res, next) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.updateReservation(updatedReservation);
  res.json({ data });
}

module.exports = {
  list,
  create: [
    hasRequiredFields,
    hasOnlyValidProperties,
    dateValidator,
    timeValidator,
    reservationIsInFuture,
    peopleIsNumber,
    isTuesday,
    reservationWithinOperatingHours,
    reservationStatus,
    asyncErrorBoundary(create),
  ],
  read: [reservationExists, asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reservationExists), unknownStatus, isValueFinished, asyncErrorBoundary(update)],
  updateReservation: [hasRequiredFields,
    hasOnlyValidProperties,
    dateValidator,
    timeValidator,
    peopleIsNumber,
    reservationIsInFuture,
    reservationWithinOperatingHours,
    asyncErrorBoundary(reservationExists),
    unknownStatus,
    isValueFinished,
    asyncErrorBoundary(updateReservation),]
};