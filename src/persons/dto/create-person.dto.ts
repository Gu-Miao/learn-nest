import { IsIn, IsInt, IsString, Min } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  readonly name: string;

  @IsInt()
  @Min(0)
  readonly age: number;

  @IsIn([0, 1])
  readonly gender: 0 | 1;

  @IsString({ each: true })
  readonly hobby: string[];
}
