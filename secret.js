// CREAR UN HEXADECIMAL
console.log(
  require("crypto")
    .createHmac("sha256", "Fullstack 10")
    .update("Stronger Together")
    .digest("hex")
);
