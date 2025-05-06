export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company: {
    name: string;
    title: string;
  };
}
