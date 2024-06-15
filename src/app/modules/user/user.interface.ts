export interface TUser {
    name: string;
    email: string;
    role: 'admin' | 'user';
    password: string;
    phone: string;
    address: string;
  }
  