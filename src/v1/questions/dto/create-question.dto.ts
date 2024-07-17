import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  question: string;

  @IsInt()
  @Min(0)
  @Max(1)
  belief: number;
}
