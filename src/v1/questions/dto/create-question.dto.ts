import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  question: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  belief: number;
}
