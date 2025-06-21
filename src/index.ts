// others
import app from "./server";
import { port } from "./config/index";

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//complete
