import md5 from 'md5';

function generate(name, salt, cycles) {
  if (cycles > 0) {
    return generate(md5(name + '_' + salt), salt, cycles - 1);
  }

  return name;
}

let allowedCharacters = "_-!@#$%^&*()".split("");
let charTable = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
// charTable = charTable.concat(allowedCharacters);

export default (name, salt, cycles) => {
  return new Promise((resolve, reject) => {
    if (name && salt) {
      let hexedPassword = generate(name, salt, cycles);
      let symbols = hexedPassword.split("");
      let password = '';

      // проходим по массиву сиволов и выцепляем по 2, для преобразования в целое число
      var intermediate;
      let charCode;
      for (let i = 0; i < symbols.length; i++) {
        if (!(i % 2)) {
          intermediate = '';
        }
        intermediate += symbols[i];

        if (intermediate.length === 2) {
          charCode = parseInt("0x" + intermediate, 16) % charTable.length;
          password += charTable[charCode];
        }
      }

      resolve(password);
    } else {
      reject('Error, necessary data not provided');
    }
  });
}

