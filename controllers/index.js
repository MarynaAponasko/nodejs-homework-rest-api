const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContactbyId,
  changeStatusContact,
} = require("./contacts");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("./auth");

module.exports = {
  getContacts,
  getContactById,
  postContact,
  changeContactbyId,
  changeStatusContact,
  deleteContact,
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
};
