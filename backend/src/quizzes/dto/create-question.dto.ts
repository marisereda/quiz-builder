import { QuestionType } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsString()
  @MinLength(5)
  text: string;

  @IsNotEmpty()
  @IsEnum(QuestionType, { message: 'Invalid question type.' })
  type: QuestionType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
