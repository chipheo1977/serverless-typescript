import { User, CreateUserDto, UpdateUserDto } from '@/domain/user';

export interface IUserRepository {
  create(user: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(skip?: number, take?: number): Promise<[User[], number]>;
  update(id: string, user: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<boolean>;
}