export interface UserData {
  name: string;
  phone: string;
  email: string;
}

export interface UserFormProps {
  onSubmit: (data: UserData) => void;
}
