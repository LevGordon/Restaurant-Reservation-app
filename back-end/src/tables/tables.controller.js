const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const data = await service.list();
    res.json({ data: data });
  }

async function create(req, res, next) {
    const table = req.body.data
    const data = await service.create(table)
    res.status(201).json({data})
}

// VALIDATION PIPELINE
const VALID_PROPERTIES = [
    "table_id",
    "table_name",
    "capacity",
    "created_at",
    "updated_at",
    "is_free",
    "reservation_id"
  ];
  
  function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
  
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
  
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  }

  function hasAllFields(...fields) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      console.log(data)
      try {
        fields.forEach((field) => {
          if (!data[field]) {
            const error = new Error(`A '${field}' property is required.`);
            error.status = 400;
            throw error;
          }
        });
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  const hasRequiredFields = hasAllFields(
    "capacity",
    "table_name"
  );

  function capacityIsNumber(req, res, next) {
    const { data = {} } = req.body;
    if (typeof data["capacity"] != "number" || data["capacity"]  < 1 ) {
      return next({
        status: 400,
        message: `"capacity" field must be a number `,
      });
    }
    next();
  }


  function nameLengthValidator(req, res, next) {
    const {data} = req.body
    if (data["table_name"].length < 2) {
        return next({
          status: 400,
          message: `table_name must be at least 2 characters`,
        });
      }
      next();
  }

 
module.exports = {
    list:[asyncErrorBoundary(list)],
    create:[hasOnlyValidProperties, 
        hasRequiredFields, 
        capacityIsNumber,
        nameLengthValidator,
        asyncErrorBoundary(create)],   
};