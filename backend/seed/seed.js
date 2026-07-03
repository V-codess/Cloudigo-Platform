const Offers = require("../model/offerSchema");

const seedOffers = async () => {
  try {
    const count = await Offers.countDocuments();

    if (count > 0) {
      console.log("Seed skipped: data already exists");
      return;
    }

    await Offers.insertMany([
      {
        title: "23% Off Summer Special",
        description: "Get discount on all summer collection items including apparel, accessories, and more.",
        image: "https://example.com/images/summer-offer.jpg",
        category: "fashion",
        merchantName: "SunStyle Boutique",
        discount: 23,
        outlets: [
          "Bugibba Main Street Store",
          "St. Paul's Bay Mall Outlet"
        ],
        termsAndConditions:
          "Valid on selected items only. Cannot be combined with other offers. Valid while stocks last.",
        availability: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday"
        ],
        status: "active",
        offerType: "basic",
        usageLimit: "once",
        startDate: new Date("2026-07-01"),
        endDate: new Date("2026-07-30")
      },

      {
        title: "50% Weekend Fashion Blast",
        description: "Exclusive weekend discount on premium fashion wear.",
        image: "https://example.com/images/weekend-fashion.jpg",
        category: "fashion",
        merchantName: "Urban Wear Co",
        discount: 50,
        outlets: [
          "Valletta Shopping Centre",
          "Sliema Retail Hub"
        ],
        termsAndConditions:
          "Weekend only offer. Cannot be combined with other promotions.",
        availability: [
          "saturday",
          "sunday"
        ],
        status: "active",
        offerType: "premium",
        usageLimit: "week",
        startDate: new Date("2026-07-05"),
        endDate: new Date("2026-08-05")
      },

      {
        title: "15% Beauty Essentials Deal",
        description: "Save on skincare and beauty products across all outlets.",
        image: "https://example.com/images/beauty-offer.jpg",
        category: "beauty",
        merchantName: "GlowUp Store",
        discount: 15,
        outlets: [
          "Bugibba Plaza",
          "Mosta Center"
        ],
        termsAndConditions:
          "Applicable only on selected beauty products.",
        availability: [
          "monday",
          "wednesday",
          "friday"
        ],
        status: "active",
        offerType: "basic",
        usageLimit: "once",
        startDate: new Date("2026-07-10"),
        endDate: new Date("2026-08-10")
      }
    ]);

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Seed error:", error.message);
  }
};

module.exports = seedOffers;