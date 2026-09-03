import "dotenv/config";
import app from "./app.js";
import { Env } from "./config/env.js";

const PORT = Env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
