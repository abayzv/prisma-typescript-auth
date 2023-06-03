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
