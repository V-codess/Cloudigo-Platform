const Offers = require("../model/offerSchema");

const seedData = [
  {
    title: "23% Off Summer Special",
    description:
      "Get discount on all summer collection items including apparel, accessories, and more.",
    image: "https://images.pexels.com/photos/15160252/pexels-photo-15160252.jpeg",
    category: "fashion",
    merchantName: "SunStyle Boutique",
    discount: 23,
    outlets: ["Bugibba Main Street Store", "St. Paul's Bay Mall Outlet"],
    termsAndConditions:
      "Valid on selected items only. Cannot be combined with other offers. Valid while stocks last.",
    availability: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    status: "active",
    offerType: "basic",
    usageLimit: "once",
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-07-30"),
  },
  {
    title: "50% Weekend Fashion Blast",
    description: "Exclusive weekend discount on premium fashion wear.",
    image: "https://images.pexels.com/photos/29906028/pexels-photo-29906028.jpeg",
    category: "fashion",
    merchantName: "Urban Wear Co",
    discount: 50,
    outlets: ["Valletta Shopping Centre", "Sliema Retail Hub"],
    termsAndConditions:
      "Weekend only offer. Cannot be combined with other promotions.",
    availability: ["saturday", "sunday"],
    status: "active",
    offerType: "premium",
    usageLimit: "week",
    startDate: new Date("2026-07-05"),
    endDate: new Date("2026-08-05"),
  },
  {
    title: "15% Beauty Essentials Deal",
    description: "Save on skincare and beauty products across all outlets.",
    image: "https://images.pexels.com/photos/4735904/pexels-photo-4735904.jpeg",
    category: "beauty",
    merchantName: "GlowUp Store",
    discount: 15,
    outlets: ["Bugibba Plaza", "Mosta Center"],
    termsAndConditions: "Applicable only on selected beauty products.",
    availability: ["monday", "wednesday", "friday"],
    status: "active",
    offerType: "basic",
    usageLimit: "once",
    startDate: new Date("2026-07-10"),
    endDate: new Date("2026-08-10"),
  },
];

const seedOffers = async () => {
  try {
    const count = await Offers.countDocuments();

    if (count === 0) {
      await Offers.insertMany(seedData);
      console.log("Seed data inserted successfully");
      return;
    }

    let fixed = 0;
    for (const offer of seedData) {
      const result = await Offers.updateOne(
        { title: offer.title, $or: [{ image: { $exists: false } }, { image: null }, { image: "" }, { image: /example\.com/ }] },
        { $set: { image: offer.image } }
      );
      if (result.modifiedCount > 0) fixed += 1;
    }

    if (fixed > 0) {
      console.log(`Fixed ${fixed} offer image URL(s)`);
    } else {
      console.log("Seed skipped: data already exists");
    }
  } catch (error) {
    console.error("Seed error:", error.message);
  }
};

module.exports = seedOffers;
