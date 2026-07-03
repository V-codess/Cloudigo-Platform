const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: ["food_drink", "fashion", "kids", "sports_fitness", "health","entertainment", "jewellery", "watches", "beauty", "home", "artists", "weddings","toys","gifts","travel","electronics","online_shopping","property_market", "automotive"],
      required: true,
    },
    merchantName: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    outlets:{
      type: [String],
      required: true
    },
    termsAndConditions:{
      type: String,
      required: true 
    },
    availability: {
    type: [String],
    enum: ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    offerType: {
      type: String,
      enum: ["basic", "premium"],
      required: true,
    },
    usageLimit: {
      type: String,
      enum: ["unlimited", "once", "twice","week","month","year"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

offerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
})

module.exports = mongoose.model("Offer", offerSchema);