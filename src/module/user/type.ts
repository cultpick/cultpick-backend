import { User, UserToCategory } from '@prisma/client';

export type UserWithUTCs = User & {
  userToCategory: UserToCategory[];
};
