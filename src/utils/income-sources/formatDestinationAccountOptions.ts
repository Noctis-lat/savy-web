import { INCOME_DESTINATION_ACCOUNT_TYPES } from "@/content/income-sources/incomeSourceContent";

/**
 * Maps accounts into select options, keeping only the account types the backend
 * accepts as income destination (DEBIT and CASH).
 */
export const formatDestinationAccountOptions = (accounts: Account[] | undefined): Option[] =>
	(accounts ?? [])
		.filter((account) => INCOME_DESTINATION_ACCOUNT_TYPES.includes(account.type))
		.map((account) => ({ label: account.name, value: account.id }));
