export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
  GUEST = 'guest'
}

export interface User {
  id: string;
  role: UserRole;
  mapAccess: boolean;
  // other user properties
}
