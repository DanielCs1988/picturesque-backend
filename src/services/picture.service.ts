import {inject, injectable} from "inversify";
import {IPicture, PictureModel, PictureRepository} from "../models/picture.model";
import {Model} from "mongoose";

@injectable()
export class PictureService {

    private readonly model: Model<PictureModel>;

    constructor(@inject('PictureRepository') private pictureRepository: PictureRepository) {
        this.model = pictureRepository.model;
    }

    getPictures = (first: number, skip: number) => {
        return this.model.find({});
    };

    getPicture = async (id: string) => {
        const picture = await this.model.findById(id);
        if (picture) {
            return picture;
        }
        throw new Error(`Picture id ${id} not found!`);
    };

    createPicture = (picture: IPicture) => {
        const { title, url } = picture;
        if (!(title && url)) {
            throw new Error('Picture must contain a title and an url!');
        }
        const newPicture = new this.model({ title, url });
        return newPicture.save();
    };

    updatePicture = async (id: string, picture: IPicture) => {
        const { createdAt, ...updatedValues } = picture;
        const updatedPicture = await this.model.findByIdAndUpdate(
            id, {$set: updatedValues }, { new: true }
        );
        if (updatedPicture) {
            return updatedPicture;
        }
        throw new Error(`Picture id ${id} not found!`);
    };

    deletePicture = async (id: string) => {
        const deletedPicture = await this.model.findByIdAndRemove(id);
        if (deletedPicture) {
            return deletedPicture;
        }
        throw new Error(`Picture id ${id} not found!`);
    }
}