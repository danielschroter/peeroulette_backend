const { frontendURL } = require("../config");

// Email confirmation template (Content)
module.exports = {
  confirm: (id, email) => ({
    subject: "Peeroulette Confirmation Email",
    html: `
    <h3> Thank You for using our Corporate Accounts </h3>
    <p> We will activate the following domain to your corporate account: ${email} </p>
      <a href='${frontendURL}/confirm/${id}'>
        Click to confirm your domain for Peeroulette
      </a>
    `,
  }),
};
