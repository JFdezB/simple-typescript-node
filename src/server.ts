import App from './app';
import {
  UserController
} from './controllers';


const PORT = process.env.PORT || 3000;

const app = new App(
  [
    UserController
  ],
  PORT,
);

app.init().then(async () => {
  await app.listen();
}).catch((err) => {
  console.error(err);
  process.exit(1);
})

export default {}