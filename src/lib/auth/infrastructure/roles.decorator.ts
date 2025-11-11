import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/domain/UserRole';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);