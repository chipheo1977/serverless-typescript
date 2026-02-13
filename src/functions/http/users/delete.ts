import { APIGatewayProxyHandler } from 'aws-lambda';
import { AppDataSource } from '@/config/datasourse';
import { User } from '@/domain/user/entity/User';
import { UserRepository } from '@/domain/user/repository/UserRepository';
import { UserService } from '@/domain/user/service/UserService';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { id } = event.pathParameters || {};
    const userRepository = new UserRepository(AppDataSource.getRepository(User));
    const userService = new UserService(userRepository);

    await userService.deleteUser(id);

    return {
      statusCode: 204,
      body: '',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};