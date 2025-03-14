export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  email: string;
  role: UserRole;
  uid: string;
}
