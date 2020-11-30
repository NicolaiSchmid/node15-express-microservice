## Get your hands dirty

```
$ faas template pull https://github.com/nicolaischmid/node15-express-microservice
$ faas new --lang node15-express-microservice
```

### Basic example

```js
import { Router } from "express";

export default ({ app }) => {
  const router = Router();

  router.post("/", (request, response) => {
    return response.json({ message: "Hello world!", body: request.body });
  });

  return router;
};
```

### Basic example with one external package that prints the time

```
yarn add moment
```

```js
import { Router } from "express";
import moment from "moment";

export default ({ app }) => {
  const router = Router();

  router.get("/", (request, response) => {
    return response.json({ time: moment() });
  });

  return router;
};
```
