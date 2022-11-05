export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidation;
    switch (validateMethod) {
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidation = !data;
        } else {
          statusValidation = data.trim() === "";
        } //  проверка на верность
        break;
      }
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidation = !emailRegExp.test(data); // страндарт для мыла
        break;
      }
      case "isCapitalSymbol": {
        const capitalSymbol = /[A-Z]+/g;
        statusValidation = !capitalSymbol.test(data); //  заглавная буква
        break;
      }
      case "isContainDigit": {
        const containDigit = /\d+/g;
        statusValidation = !containDigit.test(data); //  усть цифры
        break;
      }
      case "min": {
        statusValidation = data.length < config.value; //  8 символов
        break;
      }

      default:
        break;
    }
    if (statusValidation) return config.message; //  config[fieldName][validateMethod]
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod, //  isRequired
        data[fieldName], //  email or password { email: "", password: "" }
        config[fieldName][validateMethod] //  { message: "E-mail is important for feel" }
      );
      //  для того чтобы выдавало первую ошибку о пустом поле сравнивают есть ли ошибки и чтобы не было такой же ошибки
      if (error && !errors[fieldName]) {
        errors[fieldName] = error; //  Тут передается ключ fieldName а error это это текст из email: { isRequired: { message: "E-mail is important for feel" } }
      }
    }
  }
  return errors;
}
