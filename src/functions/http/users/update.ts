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
    const body = JSON.parse(event.body || '{}');
    
    const userRepository = new UserRepository(AppDataSource.getRepository(User));
    const userService = new UserService(userRepository);

    const result = await userService.updateUser(id, body);

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