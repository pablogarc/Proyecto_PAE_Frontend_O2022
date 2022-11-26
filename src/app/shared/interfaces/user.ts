export interface User {
  _id: string,
  full_name: string;
  email: string;
  password?: string;
  image: string;
  description: string;
  google?: boolean;
}
