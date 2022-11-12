function generateAuthError(message) {
  switch (message) {
    case "EMAIL_NOT_FOUND":
      return { message: "e-mail or password is uncorrect", type: "login" };

    case "INVALID_PASSWORD":
      return { message: "e-mail or password is uncorrect", type: "login" };
    case "EMAIL_EXISTS":
      return { message: "The e-mail is exist", type: "reg" };
    default:
      return { message: "too many attempts, try later", type: "login" };
  }
}
export default generateAuthError;
