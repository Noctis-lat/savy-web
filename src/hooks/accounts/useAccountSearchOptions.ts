import { useState } from "react";
import { formatAccountOptions } from "@/utils/accounts/formatAccountOptions";
import { useQueryAccount } from "./useQueryAccount";
import { useQueryAccounts } from "./useQueryAccounts";

type UseAccountSearchOptionsReturn = {
	accountOptions: Option[];
	isLoading: boolean;
	setAccountSearch: (search: string) => void;
};

/**
 * Server-side account search for FormAsyncSelect.
 * The selected account is always kept in the options so its label stays
 * resolvable when it falls outside the current search results.
 */
export const useAccountSearchOptions = (
	selectedAccountId: string | undefined,
): UseAccountSearchOptionsReturn => {
	const [accountSearch, setAccountSearch] = useState<string>("");

	const { accounts, isLoading } = useQueryAccounts({
		search: accountSearch || undefined,
		isActive: true,
		sortBy: "name",
		order: "asc",
		perPage: 20,
	});
	const { account: selectedAccount } = useQueryAccount(selectedAccountId || undefined);

	const searchedAccounts = accounts ?? [];
	const isSelectedMissing =
		selectedAccount !== undefined &&
		!searchedAccounts.some((account) => account.id === selectedAccount.id);

	const accountOptions = formatAccountOptions(
		isSelectedMissing ? [selectedAccount, ...searchedAccounts] : searchedAccounts,
	);

	return { accountOptions, isLoading, setAccountSearch };
};
