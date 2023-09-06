import { body } from "express-validator";

const Domains = [
	"MEAN",
	"MERN",
	"PYTHON",
	"GO",
	"JAVA",
	"RUBY",
	"SWIFT",
	"FLUTTER",
	".NET",
	"ML",
	"DATASCIENCE",
	"DATAENGINEERING",
	"CYBERSECURITY",
	"NODEJS",
	"DEVOPS",
	"LOWCODE",
	"GAMEDEVELOPEMENT"
];

export const studentValidator = [
	// Name validation
	body("name")
		.notEmpty()
		.trim()
		.withMessage("Name is required")
		.bail()
		.isLength({ min: 2 })
		.withMessage("Name should be at least 2 characters long")
		.isLength({ max: 50 })
		.withMessage("Name should be less than 50 characters"),

	// Batch validation
	body("batch")
		.notEmpty()
		.trim()
		.withMessage("Batch is required")
		.bail()
		.isLength({ min: 2 })
		.withMessage("Batch should be at least 2 characters long")
		.isLength({ max: 10 })
		.withMessage("Batch should be less than 10 characters"),

	// Domain validation
	body("domain")
		.notEmpty()
		.trim()
		.withMessage("Domain is required")
		.bail()
		.isIn(Domains)
		.withMessage(`Invalid Domain!Please select valid Domain name: ${Domains}`),

	// Phone validation
	body("phone")
		.notEmpty()
		.trim()
		.withMessage("Phone number is required")
		.bail()
		.isMobilePhone("en-IN", { strictMode: false })
		.withMessage("Invalid phone number"),

	// Email validation
	body("email").notEmpty().trim().withMessage("Email is required").bail().isEmail().withMessage("Invalid email address").normalizeEmail(),

	// LeetCode ID validation
	body("leetcodeId")
		.notEmpty()
		.trim()
		.bail()
		.withMessage("LeetCode ID is required")
		.isLength({ min: 2 })
		.withMessage("LeetCode ID should be at least 2 characters long")
		.isLength({ max: 10 })
		.withMessage("LeetCode ID should be less than 10 characters")
];

export const signinValidator = [
	body("phone")
		.notEmpty()
		.trim()
		.withMessage("Phone number is required")
		.bail()
		.isMobilePhone("en-IN", { strictMode: false })
		.withMessage("Invalid phone number")
];

export const otpValidator = [
	body("phone")
		.notEmpty()
		.trim()
		.withMessage("Phone number is required")
		.bail()
		.isMobilePhone("en-IN", { strictMode: false })
		.withMessage("Invalid phone number"),

	body("otp")
		.notEmpty()
		.withMessage("OTP is required")
		.bail()
		.isLength({ min: 4, max: 4 })
		.withMessage("OTP should be 4 digits")
		.bail()
		.matches(/^\d+$/)
		.withMessage("OTP should contain only digits")
];

export const messageValidator = [
	body("message")
		.notEmpty()
		.trim()
		.withMessage("Message is required")
		.bail()
		.isLength({ min: 2 })
		.withMessage("Message should be at least 2 characters long")
];
