import { Type } from 'class-transformer';
import { IsPositive, IsOptional, Min, IsNumber } from 'class-validator'

export class PaginationDto {
    
    @IsPositive()
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit?: number;

    @IsPositive()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    offset?: number;
}