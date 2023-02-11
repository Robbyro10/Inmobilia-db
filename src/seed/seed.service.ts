import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeAPIResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
    constructor(
      private readonly httpService: HttpService,
      private readonly pokemonService: PokemonService
    ) {}

    async executeSeed() {

      this.pokemonService.clearDB();

      const { data } = await firstValueFrom(
        this.httpService
          .get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=600')
          .pipe(
            catchError((error: AxiosError) => {
              console.error(error.response.data);
              throw 'Could not find Pokemon';
            }),
          ),
      );

      const pokemonToInsert: Pokemon[] = []

      data.results.forEach(({name, url}) => {

        const segments = url.split('/');
        const number = +segments[segments.length - 2];
        // await this.pokemonService.create({name, number});
        pokemonToInsert.push({name, number})
  

      });
      
      this.pokemonService.fillDB(pokemonToInsert);
      
      return 'Seed executed successfully';
    }
}
