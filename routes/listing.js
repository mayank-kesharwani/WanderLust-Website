const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js")
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

//Index route
//Create Route
router.route("/").get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing))
//New Route
router.get("/new", isLoggedIn, listingController.newListing)
//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing))

//Show Route
//Update Route
//Delete Route
router.route("/:id").get( wrapAsync(listingController.showListing)).patch(isLoggedIn, isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing)).delete( isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))

module.exports = router
