import { UserRang } from './user-rang.enum.js';

export type User = {
  name: string,
  email: string,
  avatar: string,
  userRang: UserRang,
}
