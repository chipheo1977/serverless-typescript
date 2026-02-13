import { AppDataSource } from '@/config/datasourse';
import { User, UserRepository, UserService } from '@/domain/user';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // Initialize database
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    console.log('Creating user with data:', AppDataSource.isInitialized);
    const userRepository = new UserRepository(AppDataSource.getRepository(User));
    const userService = new UserService(userRepository);

    const body = JSON.parse(event.body || '{}');
    const result = await userService.createUser(body);

    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    }
  }
};