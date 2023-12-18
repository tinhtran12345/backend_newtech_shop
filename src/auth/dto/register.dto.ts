import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  last_name: string;

  @MinLength(6, { message: 'password too short' })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  email: string;
}
