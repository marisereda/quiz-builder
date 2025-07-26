import { QuestionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @MinLength(5)
  content: string;

  @IsNotEmpty()
  @IsEnum(QuestionType, { message: 'Invalid question type.' })
  type: QuestionType;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
