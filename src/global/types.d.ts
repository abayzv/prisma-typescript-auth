interface User {
  id: string;
  roleID?: number;
  email?: string;
  createdAt?: Date;
}

interface Permission {
  id: number;
}

interface Permissions {
  permission: Permission[];
}

interface Role {
  id?: number;
  name: string;
}

interface RolePermission {
  roleId: number;
  permissionId: number;
  createdAt?: Date | string;
}

declare enum UserRoles {
  superadmin = 1,
  admin = 2,
  teacher = 3,
  student = 4,
  parent = 5,
}
