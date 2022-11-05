function generateAuthError(message) {
  switch (message) {
    case "EMAIL_NOT_FOUND":
      return "e-mail or password is uncorrect";

    case "INVALID_PASSWORD":
      return "e-mail or password is uncorrect";
    case "EMAIL_EXISTS":
      return "The e-mail is exist";

    default:
      return "too many attempts, try later";
  }
}
export default generateAuthError;
