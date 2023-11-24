const getEmailOption = (
  serviceID,
  otp = '584528',
  username = 'Moussa',
  link = 'http://localhost:5000/api/reset-password',
  merchantName = 'Marchant',
  merchantEmail = 'merchant@mail.com',
  merchantPassword = 'newPassword'
) => {
  switch (true) {
    case serviceID === 'OTP':
      return {
        subject: '[VALSORIA] Vérification OTP',
        file: 'otp-html.ejs',
        data: {
          otp,
        },
      };
    case serviceID === 'UPDATE-PWD':
      return {
        subject: '[VALSORIA] Modification de mot de passe',
        file: 'update-password.ejs',
        data: '',
      };
    case serviceID === 'RESET-PWD-MERCHANT':
      return {
        subject: '[VALSORIA] Réiniation de mot de passe',
        file: 'update-password-merchant.ejs',
        data: {
          merchantName,
          merchantEmail,
          merchantPassword,
        },
      };
    case serviceID === 'FORGOT-PWD':
      return {
        subject: '[VALSORIA] Mot de passe oublié ?',
        file: 'forgot_password.ejs',
        data: {
          link,
        },
      };
    case serviceID === 'WELCOME-CLIENT':
      return {
        subject: '[VALSORIA] Inscription Réussie !',
        file: 'welcome-subscription-customer.ejs',
        data: {
          username,
        },
      };
    case serviceID === 'WELCOME-PDV':
      return {
        subject: '[VALSORIA] Inscription Réussie !',
        file: 'welcome-subscription-pdv.ejs',
        data: '',
      };
  }
};

module.exports = getEmailOption;
