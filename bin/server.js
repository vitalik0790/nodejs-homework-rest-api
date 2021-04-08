const app = require("../app");
const mongoDbConnect = require("../services/mongoDb");

const PORT = process.env.PORT || 3000;

mongoDbConnect
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(`Server connection error. Error: ${error.message}`);
    process.exit(1);
  });
