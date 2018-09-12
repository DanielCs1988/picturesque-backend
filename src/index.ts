import { json } from "body-parser";
import { Container } from "inversify";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import "./controllers/picture.controller";
import {PictureRepository} from "./models/picture.model";
import {PictureService} from "./services/picture.service";
import {connect} from "mongoose";
import {cors} from "./middleware/cors";

connect(process.env.MONGODB_URI!, { useNewUrlParser: true });
const port = process.env.PORT || 8080;

const container = new Container();
container.bind<PictureRepository>('PictureRepository').to(PictureRepository).inSingletonScope();
container.bind<PictureService>('PictureService').to(PictureService).inSingletonScope();

const server = new InversifyExpressServer(container);
server.setConfig(app => {
    app.use(cors);
    app.use(json());
});

const app = server.build();

app.listen(port, () => console.log(`Server is running on port ${port}...`));