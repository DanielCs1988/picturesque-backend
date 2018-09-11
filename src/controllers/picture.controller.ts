import {
    controller, httpDelete, httpGet, httpPost, httpPut,
    interfaces, queryParam, requestBody, requestParam, response
} from "inversify-express-utils";
import { Response } from 'express';
import {inject} from "inversify";
import {PictureService} from "../services/picture.service";
import { IPicture } from "../models/picture.model";

@controller('/pictures')
export class PictureController implements interfaces.Controller {

    constructor(@inject('PictureService') private pictureService: PictureService) { }

    @httpGet('/')
    private async get(@queryParam('first') first: number, @queryParam('skip') skip: number, @response() res: Response) {
        try {
            return await this.pictureService.getPictures(first, skip);
        } catch (error) {
            res.status(400);
            return 'Database error: Could not fetch pictures.';
        }
    }

    @httpGet('/:id')
    private async getById(@requestParam('id') id: string, @response() res: Response) {
        try {
            return await this.pictureService.getPicture(id);
        } catch (error) {
            res.status(404);
            return 'Picture not found!';
        }
    }

    @httpPost('/')
    private async post(@requestBody() picture: IPicture, @response() res: Response) {
        try {
            return await this.pictureService.createPicture(picture);
        } catch (error) {
            res.status(400);
            return 'Could not save picture.';
        }
    }

    @httpPut('/:id')
    private async put(@requestParam('id') id: string, @requestBody() picture: IPicture, @response() res: Response) {
        try {
            return await this.pictureService.updatePicture(id, picture);
        } catch (error) {
            res.status(404);
            return 'Picture not found!';
        }
    }

    @httpDelete('/:id')
    private async delete(@requestParam('id') id: string, @response() res: Response) {
        try {
            return await this.pictureService.deletePicture(id);
        } catch (error) {
            res.status(404);
            return 'Picture not found!';
        }
    }
}