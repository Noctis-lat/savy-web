import { z } from "zod";
import { isValidDateOnly } from "@/utils/formatters/isValidDateOnly";

export const createAccountSchema = z
	.object({
		name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
		// SAVINGS is form-only: it is sent to the API as DEBIT or CASH plus a linked savings goal.
		type: z.enum(["DEBIT", "CREDIT", "LOAN", "CASH", "SAVINGS"], {
			message: "Selecciona un tipo de cuenta",
		}),
		bankId: z.string().optional(),
		balance: z.number().min(0, "El balance no puede ser negativo").optional(),
		currency: z.string().optional(),
		color: z.string().optional(),
		icon: z.string().optional(),
		// Shared by CREDIT and LOAN — annual rate as a plain percent (16.5 = 16.5%)
		interestRate: z.number().optional(),
		// CREDIT only — money amounts in cents
		creditLimit: z.number().optional(),
		cutDay: z.number().optional(),
		paymentDay: z.number().optional(),
		noInterestMonths: z.number().optional(),
		// LOAN only — money amounts in cents, startDate as yyyy-MM-dd
		principal: z.number().optional(),
		termMonths: z.number().optional(),
		monthlyPayment: z.number().optional(),
		startDate: z.string().optional(),
		// SAVINGS only — false/undefined = DEBIT, true = CASH; target in cents, deadline as yyyy-MM-dd
		isCashSavings: z.boolean().optional(),
		savingsTargetAmount: z.number().optional(),
		savingsDeadline: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.type === "SAVINGS") {
			if (data.savingsTargetAmount === undefined || data.savingsTargetAmount <= 0) {
				ctx.addIssue({
					code: "custom",
					path: ["savingsTargetAmount"],
					message: "La meta de ahorro es obligatoria",
				});
			}

			if (data.savingsDeadline && !isValidDateOnly(data.savingsDeadline)) {
				ctx.addIssue({
					code: "custom",
					path: ["savingsDeadline"],
					message: "La fecha límite no es válida",
				});
			}
			return;
		}

		if (data.type !== "CREDIT" && data.type !== "LOAN") return;

		if (data.interestRate === undefined) {
			ctx.addIssue({
				code: "custom",
				path: ["interestRate"],
				message: "La tasa de interés es obligatoria",
			});
		} else if (data.interestRate < 0 || data.interestRate > 100) {
			ctx.addIssue({
				code: "custom",
				path: ["interestRate"],
				message: "La tasa debe estar entre 0 y 100",
			});
		}

		if (data.type === "CREDIT") {
			if (data.creditLimit === undefined || data.creditLimit <= 0) {
				ctx.addIssue({
					code: "custom",
					path: ["creditLimit"],
					message: "El límite de crédito es obligatorio",
				});
			}

			for (const dayField of ["cutDay", "paymentDay"] as const) {
				const day = data[dayField];
				if (day === undefined) {
					ctx.addIssue({
						code: "custom",
						path: [dayField],
						message:
							dayField === "cutDay"
								? "El día de corte es obligatorio"
								: "El día de pago es obligatorio",
					});
				} else if (!Number.isInteger(day) || day < 1 || day > 31) {
					ctx.addIssue({
						code: "custom",
						path: [dayField],
						message: "Debe ser un día entre 1 y 31",
					});
				}
			}

			if (
				data.noInterestMonths !== undefined &&
				(!Number.isInteger(data.noInterestMonths) || data.noInterestMonths < 0)
			) {
				ctx.addIssue({
					code: "custom",
					path: ["noInterestMonths"],
					message: "Debe ser un número entero mayor o igual a 0",
				});
			}
		}

		if (data.type === "LOAN") {
			if (data.principal === undefined || data.principal <= 0) {
				ctx.addIssue({
					code: "custom",
					path: ["principal"],
					message: "El monto del préstamo es obligatorio",
				});
			}

			if (data.termMonths === undefined) {
				ctx.addIssue({
					code: "custom",
					path: ["termMonths"],
					message: "El plazo es obligatorio",
				});
			} else if (!Number.isInteger(data.termMonths) || data.termMonths < 1) {
				ctx.addIssue({
					code: "custom",
					path: ["termMonths"],
					message: "Debe ser un número entero mayor a 0",
				});
			}

			if (data.monthlyPayment === undefined || data.monthlyPayment <= 0) {
				ctx.addIssue({
					code: "custom",
					path: ["monthlyPayment"],
					message: "El pago mensual es obligatorio",
				});
			}

			if (!data.startDate) {
				ctx.addIssue({
					code: "custom",
					path: ["startDate"],
					message: "La fecha de inicio es obligatoria",
				});
			} else if (!isValidDateOnly(data.startDate)) {
				ctx.addIssue({
					code: "custom",
					path: ["startDate"],
					message: "La fecha de inicio no es válida",
				});
			}
		}
	});

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>;
