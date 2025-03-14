import { User, UserRole } from '../types/auth';

export class AuthService {
  private static instance: AuthService;
  
  private constructor() {}
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async checkMapAccess(userId: string): Promise<boolean> {
    try {
      // Here you would typically make an API call to check user's map access
      // For now, we'll return a mock implementation
      const user = await this.getUser(userId);
      return user.role === UserRole.ADMIN || user.mapAccess;
    } catch (error) {
      console.error('Error checking map access:', error);
      return false;
    }
  }

  async getUser(userId: string): Promise<User> {
    // Mock implementation - replace with actual API call
    return {
      id: userId,
      role: UserRole.STUDENT,
      mapAccess: true, // This would come from your backend
    };
  }

  async updateMapAccess(userId: string, hasAccess: boolean): Promise<void> {
    // Implementation to update user's map access
    // This would typically be an API call to your backend
    console.log(`Updating map access for user ${userId} to ${hasAccess}`);
  }
}
