import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValueDto {
  @IsNotEmpty()
  @IsString()
  value: string;

  image: string;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
