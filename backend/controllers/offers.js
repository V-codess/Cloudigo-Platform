const express = require("express");
const Offers = require("../model/offerSchema");
const app = express();

const getAllOffers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalOffers = await Offers.countDocuments();

    const offers = await Offers.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Offers fetched successfully",
      pagination: {
        totalOffers,
        currentPage: page,
        totalPages: Math.ceil(totalOffers / limit),
        pageSize: limit,
      },
      data: offers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching offers",
      error: error.message,
    });
  }
};

const postAnOffer = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      category,
      merchantName,
      discount,
      outlets,
      termsAndConditions,
      availability,
      status,
      offerType,
      usageLimit,
      startDate,
      endDate,
    } = req.body;

    const existingOffer = await Offers.findOne({
      title: req.body.title,
      merchantName: req.body.merchantName,
    });

    if (existingOffer) {
      return res.status(409).json({
        message: "Offer already exists",
      });
    }

    const createdOffer = await Offers.create({
      title,
      description,
      image,
      category,
      merchantName,
      discount,
      outlets,
      termsAndConditions,
      availability,
      status,
      offerType,
      usageLimit,
      startDate,
      endDate,
    });

    return res.status(201).json({
      message: "Offer created successfully",
      offer: createdOffer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating offer",
      error: error.message,
    });
  }
};

const updateOfferStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["active", "inactive"].includes(status)) {
      return res.status(400).json({
        message: "Status must be either active or inactive",
      });
    }

    const foundOffer = await Offers.findById(id);

    if (!foundOffer) {
      return res.status(404).json({
        message: "Offer not found",
      });
    }
    if (foundOffer.status === status) {
      return res.status(200).json({
        message: "Status already set to this value",
        offer: foundOffer.status,
      });
    }

    foundOffer.status = status;
    await foundOffer.save();

    return res.status(200).json({
      message: "Offer status updated successfully",
      offer: foundOffer,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating offer status",
      error: error.message,
    });
  }
};

module.exports = { getAllOffers, postAnOffer, updateOfferStatus };
