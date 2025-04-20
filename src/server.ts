import app from "./app";

if (require.main === module) {
  app.listen(3001, () => {
    console.log("Server running on port 3001 🚀");
  });
}
