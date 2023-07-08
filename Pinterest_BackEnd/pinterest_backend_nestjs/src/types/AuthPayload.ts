import { user } from '@prisma/client';

export type AuthPayload = Pick<user, 'user_id' | 'email' | 'full_name'>;
