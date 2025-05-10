export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthDate: string;
  company: {
    name: string;
    title: string;
  };
}


export interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
}


export interface EditUserForm {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
}

