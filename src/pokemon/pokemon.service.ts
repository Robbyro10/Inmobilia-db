import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<PokemonDocument>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
      
    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async findAll(paginationDto: PaginationDto ) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    const pokemons = await this.pokemonModel.find().limit( limit ).skip(offset).sort({number: 1})
    if (pokemons.length === 0) throw new NotFoundException('Could not find any pokemons');
    return pokemons;
  }

  async findOne( term: string ) {
    let pokemon: PokemonDocument;

    if ( !isNaN( +term ) ) {
      pokemon = await this.pokemonModel.findOne({ number: term });
    }

    // MongoId
    if ( isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    // Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }

    if (!pokemon) throw new NotFoundException(`Could not find Pokemon with term: ${term}`);
    return pokemon;
  }

  async update( term: string, updatePokemonDto: UpdatePokemonDto ) {
    const pokemon = await this.findOne( term );
    if ( updatePokemonDto.name )
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    
    try {

      await pokemon.updateOne( updatePokemonDto );
      return updatePokemonDto;
      
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();
    // const result = await this.pokemonModel.findByIdAndDelete( id );
    const result = await this.pokemonModel.findByIdAndDelete(id);
 
    if (!result) {
      throw new NotFoundException(`Pokemon with id: "${id}" not found`);
    }
 
    return result;
  }

  private handleExceptions( error: any ) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db: ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }

  async clearDB() {
    await this.pokemonModel.deleteMany({});
  }

  async fillDB( pokemonToInsert: Pokemon[] ) {
    await this.pokemonModel.insertMany(pokemonToInsert)
  }
}
