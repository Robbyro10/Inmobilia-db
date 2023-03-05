import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type PropertyDocument = Document<Types.ObjectId, any, Property> & Property;

@Schema()
export class Property {
    @Prop()
    address: string;

    @Prop()
    description: string;

    @Prop()
    rent?: number;
    
    @Prop()
    sale?: number;
    
    @Prop()
    bath: number;
    
    @Prop()
    rooms: number;

    @Prop()
    size: number;
    
    @Prop()
    terrain?: number;

    @Prop()
    parking: number;
    
    @Prop()
    addOns?: string;

    @Prop()
    img: string[];

    @Prop()
    type: string;

}

export const PropertySchema = SchemaFactory.createForClass( Property );

