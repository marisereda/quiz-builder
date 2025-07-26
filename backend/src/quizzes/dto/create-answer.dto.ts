import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsBoolean()
  isCorrect: boolean;
}
