const Offers = require("../model/offerSchema");

const seedData = [
  {
    title: "23% Off Summer Special",
    description: "Get discount on all summer collection items including apparel, accessories, and more.",
    image: "https://images.pexels.com/photos/15160252/pexels-photo-15160252.jpeg",
    category: "fashion",
    merchantName: "SunStyle Boutique",
    discount: 23,
    outlets: ["Bugibba Main Street Store", "St. Paul's Bay Mall Outlet"],
    termsAndConditions: "Valid on selected items only. Cannot be combined with other offers.",
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
    termsAndConditions: "Weekend only offer. Cannot be combined with other promotions.",
    availability: ["saturday", "sunday"],
    status: "active",
    offerType: "premium",
    usageLimit: "week",
    startDate: new Date("2026-07-05"),
    endDate: new Date("2026-08-05"),
  },
  {
    title: "15% Beauty Essentials Deal",
    description: "Save on skincare and beauty products.",
    image: "https://images.pexels.com/photos/4735904/pexels-photo-4735904.jpeg",
    category: "beauty",
    merchantName: "GlowUp Store",
    discount: 15,
    outlets: ["Bugibba Plaza", "Mosta Center"],
    termsAndConditions: "Applicable on selected products only.",
    availability: ["monday", "wednesday", "friday"],
    status: "active",
    offerType: "basic",
    usageLimit: "once",
    startDate: new Date("2026-07-10"),
    endDate: new Date("2026-08-10"),
  },
  {
    title: "30% Electronics Mega Sale",
    description: "Discount on smartphones, laptops and gadgets.",
    image: "https://images.pexels.com/photos/163125/iphone-smartphone-apps-apple-inc-163125.jpeg",
    category: "electronics",
    merchantName: "TechWorld Malta",
    discount: 30,
    outlets: ["Mosta Tech Park", "Sliema Tech Store"],
    termsAndConditions: "Selected items only.",
    availability: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    status: "active",
    offerType: "premium",
    usageLimit: "once",
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-08-15"),
  },
  {
    title: "20% Coffee Lovers Deal",
    description: "Discount on drinks and snacks.",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    category: "food_drink",
    merchantName: "Brew & Bean",
    discount: 20,
    outlets: ["Bugibba Café Street", "Valletta Coffee Corner"],
    termsAndConditions: "Not valid on alcohol.",
    availability: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    status: "active",
    offerType: "basic",
    usageLimit: "week",
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-09-01"),
  },
  {
    title: "40% Fitness Membership Offer",
    description: "Join gym with massive discount.",
    image: "https://images.pexels.com/photos/32610333/pexels-photo-32610333.jpeg",
    category: "sports_fitness",
    merchantName: "PowerFit Gym",
    discount: 40,
    outlets: ["St. Paul's Bay Gym", "Mosta Fitness Center"],
    termsAndConditions: "New members only.",
    availability: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    status: "active",
    offerType: "premium",
    usageLimit: "once",
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-10-01"),
  },
  {
    title: "20% Grocery Savings",
    description: "Save on daily groceries.",
    image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
    category: "home",
    merchantName: "FreshMart Malta",
    discount: 20,
    outlets: ["Bugibba Supermarket", "Mellieha Store"],
    termsAndConditions: "Selected items only.",
    availability: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    status: "active",
    offerType: "basic",
    usageLimit: "week",
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-12-01"),
  },
  {
    title: "35% Travel Booking Discount",
    description: "Discount on holiday packages.",
    image: "https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg",
    category: "travel",
    merchantName: "SkyHigh Travels",
    discount: 35,
    outlets: ["Valletta Travel Office", "Sliema Branch"],
    termsAndConditions: "Advance booking required.",
    availability: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    status: "active",
    offerType: "premium",
    usageLimit: "once",
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-09-30"),
  },
  {
    title: "25% Restaurant Feast Offer",
    description: "Discount on dine-in meals.",
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    category: "food_drink",
    merchantName: "Taste Haven",
    discount: 25,
    outlets: ["Bugibba Seafront", "Sliema Waterfront"],
    termsAndConditions: "Dine-in only.",
    availability: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    status: "active",
    offerType: "basic",
    usageLimit: "twice",
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-08-31"),
  },
  {
    title: "60% Clearance Sale",
    description: "Massive clearance across store.",
    image: "https://images.pexels.com/photos/6214456/pexels-photo-6214456.jpeg",
    category: "online_shopping",
    merchantName: "MegaStore Malta",
    discount: 60,
    outlets: ["Valletta Mega Outlet", "Mosta Central Store"],
    termsAndConditions: "Final sale items only.",
    availability: ["saturday", "sunday"],
    status: "active",
    offerType: "premium",
    usageLimit: "month",
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-07-20"),
  }
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
