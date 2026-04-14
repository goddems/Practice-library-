import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  bio?: string;
}
