const router = require("express").Router();
const trackRoutes = require("./tracks");

// Book routes
router.use("/tracks", trackRoutes);

module.exports = router;
