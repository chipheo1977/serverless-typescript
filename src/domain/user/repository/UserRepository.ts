import { Repository } from 'typeorm';
import { User, IUserRepository, CreateUserDto, UpdateUserDto } from '@/domain/user';

export class UserRepository implements IUserRepository {

  constructor(private readonly repository: Repository<User>) { }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.repository.create(dto);
    return this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findAll(skip: number = 0, take: number = 10): Promise<[User[], number]> {
    return this.repository.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.repository.update(id, dto);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

}