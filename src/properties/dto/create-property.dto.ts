import { IsString, IsInt, MinLength, IsPositive, Min, IsOptional, IsArray } from "class-validator";

export class CreatePropertyDto {
    
    @IsString()
    @MinLength(1)
    address: string;

    @IsString()
    @MinLength(1)
    description: string;
    
    @IsInt()
    @IsOptional()
    rent?: number;

    @IsInt()
    @IsOptional()
    sale?: number;

    @IsString()
    @MinLength(1)
    type: string;

    @IsInt()
    @Min(1)
    @IsPositive()
    bath: number;

    @IsInt()
    @Min(1)
    @IsPositive()
    rooms: number;

    @IsInt()
    @Min(1)
    @IsPositive()
    parking: number;

    @IsInt()
    @IsOptional()
    size: number;

    @IsInt()
    @IsOptional()
    terrain: number;

    @IsString()
    @IsOptional()
    addOns?: string;

    @IsString({each: true})
    @IsArray()
    img: string[];
}

