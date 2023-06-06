import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property, PropertyDocument } from './entities/property.entity';

@Injectable()
export class PropertiesService {

  constructor(
    @InjectModel( Property.name )
    private readonly propertyModel: Model<PropertyDocument>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    createPropertyDto.address = createPropertyDto.address.toLocaleLowerCase();

    try {
      const property = await this.propertyModel.create( createPropertyDto );
      return property;
      
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    let properties = await this.propertyModel.find();
    if (properties.length === 0) throw new NotFoundException('Could not find any properties');
    properties.reverse();
    return properties;
  }

  async findOne(term: string) {
    let property: PropertyDocument;

    // MongoId
    if ( isValidObjectId( term ) ) {
      property = await this.propertyModel.findById( term );
    }

    // Address
    if ( !property ) {
      property = await this.propertyModel.findOne({ address: term.toLowerCase().trim()})
    }

    if (!property) throw new NotFoundException(`Could not find property with term: ${term}`);
    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.findOne( id );
    if ( updatePropertyDto.address )
      updatePropertyDto.address = updatePropertyDto.address.toLowerCase();
    
    try {

      await property.updateOne( updatePropertyDto );
      return updatePropertyDto;
      
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const result = await this.propertyModel.findByIdAndDelete(id);
 
    if (!result) {
      throw new NotFoundException(`Property with id: "${id}" not found`);
    }
 
    return result;
  }

  async removeAll() {
    await this.propertyModel.deleteMany({});
    return 'Properties deleted successfully'
  }

  private handleExceptions( error: any ) {
    if (error.code === 11000) {
      throw new BadRequestException(`property exists in db: ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create property - Check server logs`);
  }
}
