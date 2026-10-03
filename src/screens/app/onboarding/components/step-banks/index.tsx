import { ArrowLeft, ArrowRight, Building2, Plus, Trash2, Wallet } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { InfoItem } from "@/components/design-system/primitives/info-item";
import { Button } from "@/components/ui/button";
import { useCreateAccount } from "@/hooks/accounts/useCreateAccount";
import { useDeleteAccount } from "@/hooks/accounts/useDeleteAccount";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useCreateBank } from "@/hooks/banks/useCreateBank";
import { useDeleteBank } from "@/hooks/banks/useDeleteBank";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import { useCreateCreditCard } from "@/hooks/credit-cards/useCreateCreditCard";
import { useCreateLoan } from "@/hooks/loans/useCreateLoan";
import type { AccountFormValues } from "@/schemas/onboarding/accountSchema";
import type { BankFormValues } from "@/schemas/onboarding/bankSchema";
import { useOnboardingController } from "@/storage/onboarding/onboardingController";
import { OnboardingProgress } from "../onboarding-progress";
import { AccountForm } from "./components/account-form";
import { BankForm } from "./components/bank-form";

export const StepBanks = (): React.ReactElement => {
	const nextStep = useOnboardingController((state) => state.nextStep);
	const prevStep = useOnboardingController((state) => state.prevStep);
	const setCreatedBanks = useOnboardingController((state) => state.setCreatedBanks);
	const setCreatedAccounts = useOnboardingController((state) => state.setCreatedAccounts);
	const createdBanks = useOnboardingController((state) => state.createdBanks);
	const createdAccounts = useOnboardingController((state) => state.createdAccounts);

	const [showForm, setShowForm] = useState<boolean>(false);
	const [formMode, setFormMode] = useState<"bank" | "account">("bank");

	const createBank = useCreateBank();
	const createAccount = useCreateAccount();
	const createCreditCard = useCreateCreditCard();
	const createLoan = useCreateLoan();
	const deleteBank = useDeleteBank();
	const deleteAccount = useDeleteAccount();

	const queryBanks = useQueryBanks();
	const queryAccounts = useQueryAccounts();

	// If the user already created banks/accounts in a previous session but
	// the controller was reset (e.g. page reload), hydrate from the API.
	useEffect(() => {
		if (createdBanks.length === 0 && queryBanks.banks && queryBanks.banks.length > 0) {
			useOnboardingController.getState().setCreatedBanks(queryBanks.banks);
		}
	}, [createdBanks.length, queryBanks.banks]);

	useEffect(() => {
		if (
			createdAccounts.length === 0 &&
			queryAccounts.accounts &&
			queryAccounts.accounts.length > 0
		) {
			useOnboardingController.getState().setCreatedAccounts(queryAccounts.accounts);
		}
	}, [createdAccounts.length, queryAccounts.accounts]);

	const isPending =
		createBank.isPending ||
		createAccount.isPending ||
		createCreditCard.isPending ||
		createLoan.isPending;
	const isDeleting = deleteBank.isPending || deleteAccount.isPending;
	const isBusy = isPending || isDeleting;

	const canContinue = createdBanks.length > 0 && createdAccounts.length > 0;

	const handleRemoveBank = async (bankId: string): Promise<void> => {
		try {
			await deleteBank.mutateAsync(bankId);
			useOnboardingController.getState().removeCreatedBank(bankId);
			// Also remove accounts that belonged to this bank.
			const orphanAccounts = createdAccounts.filter((account) => account.bankId === bankId);
			for (const account of orphanAccounts) {
				await deleteAccount.mutateAsync(account.id);
				useOnboardingController.getState().removeCreatedAccount(account.id);
			}
		} catch {
			// onError in the mutation already toasts the error.
		}
	};

	const handleRemoveAccount = async (accountId: string): Promise<void> => {
		try {
			await deleteAccount.mutateAsync(accountId);
			useOnboardingController.getState().removeCreatedAccount(accountId);
		} catch {
			// onError in the mutation already toasts the error.
		}
	};

	const handleAddBank = (): void => {
		setFormMode("bank");
		setShowForm(true);
	};

	const handleAddAccount = (): void => {
		setFormMode("account");
		setShowForm(true);
	};

	const handleBankSave = async (values: BankFormValues): Promise<void> => {
		try {
			const bank = await createBank.mutateAsync(values);
			useOnboardingController.getState().addCreatedBank(bank);
			setFormMode("account");
		} catch {
			// onError in the mutation already toasts the error.
		}
	};

	const handleAccountSave = async (values: AccountFormValues): Promise<void> => {
		try {
			const account = await createAccount.mutateAsync(values);
			useOnboardingController.getState().addCreatedAccount(account);

			// Create the associated financial entity for CREDIT/LOAN accounts.
			if (values.type === "CREDIT" && values.creditLimit !== undefined) {
				await createCreditCard.mutateAsync({
					accountId: account.id,
					creditLimit: values.creditLimit,
					cutDay: values.cutDay ?? 1,
					paymentDay: values.paymentDay ?? 1,
					interestRate: values.interestRate ?? 0,
				});
			}

			if (values.type === "LOAN" && values.principal !== undefined) {
				await createLoan.mutateAsync({
					accountId: account.id,
					principal: values.principal,
					interestRate: values.interestRate ?? 0,
					termMonths: values.termMonths ?? 1,
					startDate: new Date().toISOString(),
					monthlyPayment: values.monthlyPayment ?? 0,
				});
			}

			setShowForm(false);
		} catch {
			// onError in the mutation already toasts the error.
		}
	};

	const handleContinue = (): void => {
		setCreatedBanks(createdBanks);
		setCreatedAccounts(createdAccounts);
		nextStep();
	};

	return (
		<div className="flex w-full flex-col gap-6 sm:w-auto sm:flex-row sm:items-stretch sm:justify-center">
			{/* LEFT — principal card */}
			<GlassCard
				variant="light"
				className="relative flex w-full max-w-md flex-col gap-5 p-6 sm:p-8"
			>
				<OnboardingProgress />

				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-semibold text-foreground">Bancos y cuentas</h2>
					<p className="text-sm text-muted-foreground">
						Crea al menos un banco y una cuenta para empezar a registrar tus ingresos.
					</p>
				</div>

				{/* Banks list */}
				{createdBanks.length > 0 && (
					<div className="flex flex-col gap-2">
						<p className="text-xs font-medium text-muted-foreground">Bancos</p>
						<ul className="flex flex-col gap-2">
							{createdBanks.map((bank) => (
								<li key={bank.id}>
									<InfoItem
										icon={Building2}
										title={bank.name}
										description={bank.color ?? undefined}
										action={
											<Button
												type="button"
												variant="ghost"
												size="icon-xs"
												className="text-muted-foreground hover:text-destructive"
												onClick={() => handleRemoveBank(bank.id)}
												disabled={isBusy}
												aria-label={`Eliminar ${bank.name}`}
											>
												<Trash2 className="size-3.5" />
											</Button>
										}
									/>
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Accounts list */}
				{createdAccounts.length > 0 && (
					<div className="flex flex-col gap-2">
						<p className="text-xs font-medium text-muted-foreground">Cuentas</p>
						<ul className="flex flex-col gap-2">
							{createdAccounts.map((account) => {
								const bank = createdBanks.find((bank) => bank.id === account.bankId);
								return (
									<li key={account.id}>
										<InfoItem
											icon={Wallet}
											title={account.name}
											description={`${account.currency} · ${bank?.name ?? "Efectivo"}`}
											action={
												<Button
													type="button"
													variant="ghost"
													size="icon-xs"
													className="text-muted-foreground hover:text-destructive"
													onClick={() => handleRemoveAccount(account.id)}
													disabled={isBusy}
													aria-label={`Eliminar ${account.name}`}
												>
													<Trash2 className="size-3.5" />
												</Button>
											}
										/>
									</li>
								);
							})}
						</ul>
					</div>
				)}

				{/* Empty hint */}
				{createdBanks.length === 0 && createdAccounts.length === 0 && (
					<div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border/60 bg-muted/30 px-4 py-6 text-center">
						<Plus className="size-5 text-muted-foreground" />
						<p className="text-sm text-muted-foreground">
							Agrega un banco y una cuenta para continuar.
						</p>
					</div>
				)}

				{/* Add buttons — hidden when form is open */}
				{!showForm && (
					<div className="flex flex-col gap-2">
						{createdBanks.length === 0 && (
							<Button
								type="button"
								variant="outline"
								onClick={handleAddBank}
								disabled={isBusy}
							>
								<Plus className="size-4" />
								Agregar banco
							</Button>
						)}
						{createdBanks.length > 0 && createdAccounts.length === 0 && (
							<Button
								type="button"
								variant="outline"
								onClick={handleAddAccount}
								disabled={isBusy}
							>
								<Plus className="size-4" />
								Agregar cuenta
							</Button>
						)}
						{createdBanks.length > 0 && createdAccounts.length > 0 && (
							<div className="flex flex-row gap-2">
								<Button
									type="button"
									variant="outline"
									onClick={handleAddBank}
									disabled={isBusy}
									className="flex-1"
								>
									<Plus className="size-4" />
									Otro banco
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={handleAddAccount}
									disabled={isBusy}
									className="flex-1"
								>
									<Plus className="size-4" />
									Otra cuenta
								</Button>
							</div>
						)}
					</div>
				)}

				{/* Navigation */}
				<div className="mt-auto flex flex-row gap-3 pt-2">
					<Button
						type="button"
						variant="outline"
						onClick={prevStep}
						disabled={isBusy || showForm}
					>
						<ArrowLeft />
						Atrás
					</Button>
					<Button
						type="button"
						onClick={handleContinue}
						disabled={isBusy || !canContinue || showForm}
						className="flex-1"
					>
						Continuar
						<ArrowRight />
					</Button>
				</div>
			</GlassCard>

			{/* RIGHT — form card */}
			{showForm && (
				<GlassCard
					variant="light"
					className="relative flex w-full flex-col p-6 sm:max-w-sm sm:p-8"
				>
					{formMode === "bank" ? (
						<BankForm
							onSave={handleBankSave}
							onCancel={() => setShowForm(false)}
						/>
					) : (
						<AccountForm
							onSave={handleAccountSave}
							onCancel={() => setShowForm(false)}
							bankOptions={createdBanks.map((bank) => ({
								label: bank.name,
								value: bank.id,
							}))}
						/>
					)}
				</GlassCard>
			)}
		</div>
	);
};
