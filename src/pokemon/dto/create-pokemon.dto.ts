import { IsString, IsInt, MinLength, IsPositive, Min } from "class-validator";


export class CreatePokemonDto {

    @IsInt()
    @Min(1)
    @IsPositive()
    number: number;


    @IsString()
    @MinLength(1)
    name: string;
}
