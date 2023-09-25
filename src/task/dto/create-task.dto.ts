import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  type: 'counter' | 'timer';
  @IsNotEmpty()
  @IsNumber()
  totalTime: number;
  @IsNotEmpty()
  @IsNumber()
  currentTime: number;
  @IsNotEmpty()
  status: 'completed' | 'progress' | 'initial';
  @IsNotEmpty()
  @IsString()
  start: string;
  finish?: string;
  @IsNotEmpty()
  days: Day;
}

type Day = {
  sun: boolean;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
};
