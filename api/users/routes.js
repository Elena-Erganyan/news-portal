const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

const { catchErrors } = require("../utils/catchErrors");
const {
  register,
  login,
  logout,
  activateUser,
  resendActivation,
  getLoggedInUser,
} = require("./controllers");

router.post("/register", catchErrors(register));

// api handling user activation (the activation email's link point to here)
router.put("/activation/:token", catchErrors(activateUser));

router.get("/me", catchErrors(getLoggedInUser));

router.post("/login", catchErrors(login));

// resending acivationEmail
router.post("/activation", catchErrors(resendActivation));

router.route("/logout").post(auth, catchErrors(logout));


module.exports = router;
