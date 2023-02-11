import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type PokemonDocument = Document<Types.ObjectId, any, Pokemon> & Pokemon;
@Schema()
export class Pokemon {
    
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true, 
        index: true
    })
    number: number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
