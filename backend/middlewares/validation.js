const allowedCategories = [
  "food_drink",
  "fashion",
  "kids",
  "sports_fitness",
  "health",
  "entertainment",
  "jewellery",
  "watches",
  "beauty",
  "home",
  "artists",
  "weddings",
  "toys",
  "gifts",
  "travel",
  "electronics",
  "online_shopping",
  "property_market",
  "automotive",
];

const allowedUsageLimits = ["unlimited", "once", "twice", "week", "month", "year"];
const allowedDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const validateOffer = (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      merchantName,
      discount,
      outlets,
      termsAndConditions,
      offerType,
      startDate,
      endDate,
      usageLimit,
      availability,
    } = req.body;

    if (
      !String(title).trim() ||
      !String(description).trim() ||
      !category ||
      !String(merchantName).trim() ||
      discount === undefined ||
      discount === null ||
      !outlets ||
      !String(termsAndConditions).trim() ||
      !offerType ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (typeof discount !== "number" || discount < 0 || discount > 100) {
      return res.status(400).json({
        message: "Discount must be a number between 0 and 100",
      });
    }

    if (!Array.isArray(outlets) || outlets.length === 0 || outlets.some((o) => !String(o).trim())) {
      return res.status(400).json({
        message: "Outlets must be a non-empty array",
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category",
      });
    }

    if (!["basic", "premium"].includes(offerType)) {
      return res.status(400).json({
        message: "Invalid offer type",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({
        message: "Invalid start or end date",
      });
    }
    if (start > end) {
      return res.status(400).json({
        message: "Start date must be before end date",
      });
    }

    if (usageLimit && !allowedUsageLimits.includes(usageLimit)) {
      return res.status(400).json({
        message: "Invalid usage limit",
      });
    }

    if (!availability || !Array.isArray(availability) || availability.length === 0) {
      return res.status(400).json({
        message: "Select at least one available day",
      });
    }

    if (availability.some((day) => !allowedDays.includes(day))) {
      return res.status(400).json({
        message: "Invalid availability day",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Validation error",
      error: error.message,
    });
  }
};

module.exports = validateOffer;