import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation for Authentication
export type PhoneNumberData = {
  phoneNumber: string;
};
export const phoneNumberSchema: ZodType<PhoneNumberData> = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number should be at least 10 digits" })
    .max(10, { message: "Phone number should not exceed 10 digits" }),
});
export const usePhoneNumberValidate = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneNumberData>({ resolver: zodResolver(phoneNumberSchema) });
  return {
    register,
    handleSubmit,
    errors,
    reset,
  };
};

// Validation for OTP

export type OtpData= {
    otp: string;
  };
  export const  OtpDataSchema: ZodType<OtpData> = z.object({
   otp : z
      .string()
      .min(4, { message: "Phone number should be at least 4 digits" })
      .max(4, { message: "Phone number should not exceed 4 digits" }),
  });
  export const useOtpValidation = () => {
    const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<OtpData>({ resolver: zodResolver(OtpDataSchema) });
    return {
      register,
      handleSubmit,
      errors,
      reset,
    };
  };
  