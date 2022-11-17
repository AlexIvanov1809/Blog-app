function generateAuthError(message) {
  switch (message) {
    case "EMAIL_NOT_FOUND":
      return { message: "неверный e-mail или пароль", type: "login" };

    case "INVALID_PASSWORD":
      return { message: "неверный e-mail или пароль", type: "login" };
    case "EMAIL_EXISTS":
      return { message: "E-mail уже существует", type: "reg" };
    default:
      return {
        message: "Очень много попытокб попробуйте позже",
        type: "login"
      };
  }
}
export default generateAuthError;
