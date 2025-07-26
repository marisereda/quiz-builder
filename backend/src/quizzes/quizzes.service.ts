import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const { questions, ...quizzData } = createQuizDto;

    const createdQuestionsData = questions.map(
      ({ answers, ...questionData }) => {
        return { ...questionData, answers: { create: answers } };
      },
    );

    await this.prisma.quizz.create({
      data: {
        ...quizzData,
        questions: { create: createdQuestionsData },
      },
    });
  }

  async findAll() {
    return this.prisma.quizz.findMany({
      include: {
        questions: { include: { answers: true } },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.quizz.findUnique({
      where: { id },
      include: {
        questions: { include: { answers: true } },
      },
    });
  }

  async remove(id: number) {
    await this.prisma.quizz.delete({ where: { id } });
  }
}
