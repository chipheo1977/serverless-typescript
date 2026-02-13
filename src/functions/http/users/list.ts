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

    const skip = parseInt(event.queryStringParameters?.skip || '0');
    const take = parseInt(event.queryStringParameters?.take || '10');

    const userRepository = new UserRepository(AppDataSource.getRepository(User));
    const userService = new UserService(userRepository);

    const result = await userService.listUsers(skip, take);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};