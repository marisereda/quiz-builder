import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const { questions, ...restData } = createQuizDto;
    await this.prisma.quizz.create({
      data: {
        ...restData,

        questions: { create: questions },
      },
    });
  }

  async findAll() {
    return this.prisma.quizz.findMany({
      include: {
        questions: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.quizz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.quizz.delete({ where: { id } });
  }
}
