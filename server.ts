import "dotenv/config"
import config from "././lib/prisma/validation/config"
import app from "./app"

const port = config.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
});