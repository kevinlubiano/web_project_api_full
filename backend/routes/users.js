const router = require("express").Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");
const {
  validateUserId,
  validateUpdateUser,
  validateUpdateAvatar,
} = require("../middlewares/validation");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:userId", validateUserId, getUserById);

router.patch("/me", validateUpdateUser, updateUser);

router.patch("/me/avatar", validateUpdateAvatar, updateAvatar);

module.exports = router;
