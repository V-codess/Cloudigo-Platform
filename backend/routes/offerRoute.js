const express = require("express"); 
const {getAllOffers, postAnOffer, updateOfferStatus} = require("../controllers/offers");
const validateOffer = require("../middlewares/validation")
const router = express.Router();

router.get('/', getAllOffers);
router.post('/',validateOffer,postAnOffer);
router.patch('/:id/status',updateOfferStatus);

module.exports = router;