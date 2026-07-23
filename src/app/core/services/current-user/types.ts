import { UUserRole } from './roles';

export interface IUserRole {
  id: string;
  description: string;
}
export interface IUser {
  id: string;
  name: string;
  avatar: string;
  roles: UUserRole[];
}
