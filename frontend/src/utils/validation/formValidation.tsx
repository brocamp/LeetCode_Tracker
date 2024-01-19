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
	lastName: string;
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
		.refine((value) => /^[a-zA-Z ]+$/.test(value), {
			message: "Name must contain only alphabetic characters"
		}),
	lastName: z
		.string()
		.refine((value) => value.trim() !== "", {
			message: "Name cannot be empty"
		})
		.refine((value) => /^[a-zA-Z ]+$/.test(value), {
			message: "Last name must contain only alphabetic characters"
		}),
	phone: z
		.string()
		.min(10, { message: "Whatsapp number should be atleast 10 digits" })
		.max(10, { message: "Whatsapp number should not exceed 10 digits" })
		.refine((value) => /^\d+$/.test(value), { message: "Only numeric characters are allowed" }),
	email: z.string().email({ message: "Invalid email format" }),
	leetcodeId: z.string().refine((value) => value.trim() !== "", {
		message: "Name cannot be empty"
	}),
	batch: z
		.string()
		.refine((value) => value.length >= 5 && value.length <= 6, {
			message: "Please provide the batch based one the example"
		})
		.refine((value) => /^[A-Z0-9 ]+$/.test(value), {
			message: "Special charatcters or small leters are not  accepted "
		})
		.refine((value) => value.trim() !== "", {
			message: "Name cannot be empty"
		}),
	domain: z.string().refine((value) => value.trim() !== "", {
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
