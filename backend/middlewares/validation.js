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
      offerType
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !merchantName ||
      discount === undefined ||
      !outlets ||
      !termsAndConditions ||
      !offerType
    ) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    if (typeof discount !== "number" || discount < 0 || discount > 100) {
      return res.status(400).json({
        message: "Discount must be a number between 0 and 100"
      });
    }

    if (!Array.isArray(outlets) || outlets.length === 0) {
      return res.status(400).json({
        message: "Outlets must be a non-empty array"
      });
    }

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
      "automotive"
    ];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category"
      });
    }

    if (!["basic", "premium"].includes(offerType)) {
      return res.status(400).json({
        message: "Invalid offer type"
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Validation error",
      error: error.message
    });
  }
};

module.exports = validateOffer;