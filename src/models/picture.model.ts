import {Document, Model, model, Schema} from 'mongoose';
import {injectable} from "inversify";

export interface IPicture {
    title?: string;
    url?: string;
    createdAt?: number;
}

export interface PictureModel extends Document, IPicture { }

@injectable()
export class PictureRepository {
    private readonly PictureSchema = new Schema({
        title: {
            type: String,
            required: true,
            minlength: true,
            trim: true
        },
        url: {
            type: String,
            required: true,
            minlength: true,
            trim: true
        },
        createdAt: {
            type: Number
        }
    });

    private readonly _model = model<PictureModel>('Picture', this.PictureSchema);

    constructor() {
        this.PictureSchema.pre('save', function (next) {
            const picture = <PictureModel>this;
            picture.createdAt = new Date().getTime();
            next();
        });
    }

    get model() {
        return this._model;
    }
}