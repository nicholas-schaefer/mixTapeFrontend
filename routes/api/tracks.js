const router = require("express").Router();
const mixtapeController = require("../../controllers/mixtapeController");

// Matches with "/api/books"
router.route("/")
  .get(mixtapeController.findAll)
  .post(mixtapeController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(mixtapeController.findById)
  .put(mixtapeController.update)
  .delete(mixtapeController.remove);

module.exports = router;
