import { useState, useEffect, useRef } from "react";
import { ZodError } from "zod";
import { UserData, UserFormProps, UseUserFormReturn } from "../types";
import { userSchema, userFieldSchemas } from "../validation";

export function useUserForm({
  onSubmit,
  initialData,
  resetOnSubmit = true,
}: UserFormProps): UseUserFormReturn {
  const [formData, setFormData] = useState<UserData>({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
  });

  const [errors, setErrors] = useState<Partial<UserData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<
    Partial<Record<keyof UserData, boolean>>
  >({});
  const debounceTimeout = useRef<number | null>(null);

  const validateField = async (name: keyof UserData, value: string) => {
    try {
      await userFieldSchemas[name].parseAsync({ [name]: value });
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message,
        }));
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone") {
      newValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (debounceTimeout.current) {
      window.clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(async () => {
      await validateField(name as keyof UserData, newValue);
    }, 300);
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    await validateField(name as keyof UserData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit iniciado", formData); // Debug
    setIsSubmitting(true);

    try {
      const result = await userSchema.safeParseAsync(formData);
      console.log("Resultado da validação:", result); // Debug

      if (!result.success) {
        const newErrors: Partial<UserData> = {};
        result.error.errors.forEach((err) => {
          newErrors[err.path[0] as keyof UserData] = err.message;
        });
        setErrors(newErrors);
        console.log("Erros de validação:", newErrors); // Debug
        return;
      }

      console.log("Dados válidos, chamando onSubmit:", result.data); // Debug
      await onSubmit(result.data);

      if (resetOnSubmit) {
        console.log("Resetando formulário"); // Debug
        resetForm();
      }
    } catch (error) {
      console.error("Erro no submit:", error); // Debug
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
    });
    setErrors({});
    setTouched({});
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        window.clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid:
      Object.keys(errors).length === 0 &&
      Object.values(formData).every((v) => v && v.trim() !== ""),
  };
}

function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length > 11) return value.substring(0, 15);

  if (numbers.length > 10) {
    return numbers.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (numbers.length > 6) {
    return numbers.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  } else if (numbers.length > 2) {
    return numbers.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
  }
  return numbers;
}
