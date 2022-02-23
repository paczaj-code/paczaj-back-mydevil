const commonRegex = {
  email: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/,
  names: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+([-]?[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?$/,
  password: /^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=(.*[!@#$%^&*])+).{8,30}$/
};

module.exports = commonRegex;
