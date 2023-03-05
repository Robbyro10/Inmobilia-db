import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = Document<Types.ObjectId, any, User> & User;

@Schema()
export class User {
    @Prop({
        unique: true,
    })
    fullName: string;

    @Prop({
        unique: true,
        lowercase: true
    })
    email: string;

    @Prop()
    password: string;
    
    @Prop({
        default: true
    })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass( User );


