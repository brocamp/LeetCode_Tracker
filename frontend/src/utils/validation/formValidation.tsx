import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation for Authentication
export type PhoneNumberData = {
	phone: string;
};
export const phoneNumberSchema: ZodType<PhoneNumberData> = z.object({
	phone: z
		.string()
		.min(10, { message: "Phone number should be at least 10 digits" })
		.max(10, { message: "Phone number should not exceed 10 digits" })
});
export const usePhoneNumberValidate = () => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<PhoneNumberData>({ resolver: zodResolver(phoneNumberSchema) });
	return {
		register,
		handleSubmit,
		errors,
		reset
	};
};

// Validation for OTP

export type OtpData = {
	otp: string;
};
export const OtpDataSchema: ZodType<OtpData> = z.object({
	otp: z
		.string()
		.min(4, { message: "Phone number should be at least 4 digits" })
		.max(4, { message: "Phone number should not exceed 4 digits" })
});
export const useOtpValidation = () => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<OtpData>({ resolver: zodResolver(OtpDataSchema) });
	return {
		register,
		handleSubmit,
		errors,
		reset
	};
};

// Validation for students login

export type studentAuth = {
	name: string;
	phone: string;
	email: string;
	leetcodeId: string;
	domain: string;
	batch: string;
};
export const studentAuthSchema: ZodType<studentAuth> = z.object({
	name: z
		.string()
		.refine((value) => value.trim() !== "", {
			message: "Name cannot be empty"
		})
		.refine((value) => /^[a-zA-Z]+$/.test(value), {
			message: "Name must contain only alphabetic characters"
		}),
	phone: z
		.string()
		.min(10, { message: "Whatsapp number should be atleast 10 digits" })
		.max(10, { message: "Whatsapp number should not exceed 10 digits" }),
	email: z.string().email({ message: "Invalid email format" }),
	leetcodeId: z
		.string()
		.refine((value) => value.trim() !== "", {
			message: "Name cannot be empty"
		}),
	batch: z
		.string()
		.refine((value) => value.length >= 4 && value.length <= 6, {
			message: "leetCodeId must be between 4 and 6 characters long"
		})
		.refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
			message: "Special charatcters are not accepted"
		})
		.refine((value) => value.trim() !== "", {
			message: "Name cannot be empty"
		}),
	domain: z
		.string()
		.refine((value) => /^[A-Z]+$/.test(value), {
			message: "Domain must contain only uppercase letters"
		})
		.refine((value) => value.trim() !== "", {
			message: "Domain cannot be empty"
		})
});
export const useStudentAuth = () => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<studentAuth>({ resolver: zodResolver(studentAuthSchema) });
	return {
		register,
		handleSubmit,
		errors,
		reset
	};
};
