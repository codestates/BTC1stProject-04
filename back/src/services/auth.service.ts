import * as crypto from 'crypto';
import moment from 'moment';

function createEncryptedPassword(password: string, salt: string) {
    const encryptedPassword = crypto
      .createHash('sha512')
      .update(password + salt)
      .digest('base64');
  
    return encryptedPassword;
}
  
function createEncryptedPasswordAndSalt(password: string) {
    const salt = moment().format('YYYYMMDDHHmmss');
    const encryptedPassword = createEncryptedPassword(password, salt);
  
    return {encryptedPassword, salt};
}

function comparePassword(passwordInput: string, password: string, salt: string) {
    const existedEncryptedPassword = createEncryptedPassword(passwordInput, salt);

    return password === existedEncryptedPassword;
}

export default {
    createEncryptedPasswordAndSalt,
    comparePassword,
}