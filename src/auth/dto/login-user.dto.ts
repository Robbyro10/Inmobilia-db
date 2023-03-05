
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password: string;
}