export interface UserData {
  name: string;
  phone: string;
  email: string;
}

export interface UserFormProps {
  onSubmit: (data: UserData) => Promise<void> | void;
  initialData?: Partial<UserData>;
  resetOnSubmit?: boolean;
}

export interface UseUserFormReturn {
  formData: UserData;
  errors: Partial<Record<keyof UserData, string>>;
  touched: Partial<Record<keyof UserData, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}
