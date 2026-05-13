const jwt = require("jsonwebtoken");

const token = jwt.sign(
  {
    userId: "69fb1de6036910ecb5c5f8a9",
  },
  "replace_this_with_a_long_random_secret",
  {
    expiresIn: "1h",
  }
);

console.log(token);
