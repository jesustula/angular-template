export class User {
  id?: number;
  name?: string;
  last_name?: string;
  second_last_name?: string;
  email?: string;
  password?: string;
  role_id?: number;
  role?: Role;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  toCreate(): Partial<User> {
    return {
      name: this.name,
      last_name: this.last_name,
      second_last_name: this.second_last_name,
      email: this.email,
      password: this.password,
      role_id: this.role_id,
    };
  }
}

export interface Role{
  id: number;
  name: string;
}
