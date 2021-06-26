const nodemailer = require("nodemailer");

// Credentials of the sending email account
const credentials = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // Auth method PLAIN
    user: "peeroulette@gmail.com",
    pass: "rAi!s2irAdzW32CtM287",

    // Auth method OAuth2 (https://nodemailer.com/smtp/oauth2/)
    // type: "OAuth2",
    // user: "peeroulette@gmail.com",
    // clientId:
    //   "657738765381-69n665hpa73777630vf3dov5a2dmrg37.apps.googleusercontent.com",
    // clientSecret: "GLFnbcDNQiuWgq469Wkv_FsO",
    // refreshToken:
    //   "1//04Ohm__LjjiEPCgYIARAAGAQSNwF-L9Ir36LqPObqJX_xoKC8LDCrNIfWrtm1nteAgT_TAVehpMa5xaCm5xSb9mFv9a6r2V3fVb8",
    // accessToken:
    //   "ya29.a0AfH6SMAVax2zy4tgrckAorbex4FUWEMRDeyfKHfvP3Uq3nNECFUe0TIVOSpw9nJcwEhXnkQEKEQyQLz8h1urlflEj6j6ck4zTeExPM_o617cUXodKxCxI8c1Pl_IA3v1ymbgDAsgF3ibmO7BFMBNxAeqVTjX",
  },
};

// To send emails you need a transporter object with de defined credentials
const transporter = nodemailer.createTransport(credentials);

// Exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
module.exports = async (to, content) => {
  // The from and to addresses for the email that is about to be sent.
  const contacts = {
    from: "peeroulette@gmail.com",
    to,
  };

  // Combining the content and contacts into a single object that can be passed to Nodemailer
  const email = Object.assign({}, content, contacts);

  // Once you have a transporter object you can send mail with it
  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.log(error);
  }
};
