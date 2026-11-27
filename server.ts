import app from "./dist/app.js";
import { env } from "./src/config/env.js";


app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);

  console.log(`Environment: ${env.NODE_ENV}`);
});
