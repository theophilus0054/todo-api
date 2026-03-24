const express = require("express");
const router = express.Router();

// temporary route (biar tidak error)
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Task route is working"
  });
});

module.exports = router;