/**
 * Date: 09/07/2023
 * Subject: E-comers Project helper
 * Auth: Ismile Sardar
 */

//compare Password
exports.comparePassword = (password, oldPassword) => {
  if (password === oldPassword) {
    return true;
  }
  return false;
};
