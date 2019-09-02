const router = require("express").Router();
const mixtapeController = require("../../controllers/mixtapeController");

// Matches with "/api/tracks"
router.route("/")
  .get(mixtapeController.findAll)
  .post(mixtapeController.create)
  .delete(mixtapeController.removeAll);

// Matches with "/api/tracks/:id"
router
  .route("/:id")
  .get(mixtapeController.findById)
  .put(mixtapeController.update)
  .delete(mixtapeController.remove);

module.exports = router;
