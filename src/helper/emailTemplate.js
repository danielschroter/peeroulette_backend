const { frontendURL } = require("../config");

// Email confirmation template (Content)
module.exports = {
  confirm: (id) => ({
    subject: "Peeroulette Confirmation Email",
    html: `
    <h3> Welcome to Peeroulette </h3>
      <a href='${frontendURL}/confirm/${id}'>
        Click to confirm your email for Peeroulette
      </a>
    `,
  }),
};
