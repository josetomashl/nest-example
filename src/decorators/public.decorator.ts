import { SetMetadata } from '@nestjs/common';

// Using this decorator makes the endpoint public,
// which means no Authorization is required to access

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
