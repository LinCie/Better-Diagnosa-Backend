import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  @IsNotEmpty()
  isDengue: boolean;
}
