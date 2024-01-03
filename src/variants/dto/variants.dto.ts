import { IsNotEmpty, IsString } from 'class-validator';

export class VariantsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
