import type React from "react";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";

export const Accounts = (): React.ReactElement => {
	const { accounts, isLoading } = useQueryAccounts({ info: true });

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!accounts) {
		return <div>No accounts found</div>;
	}

	return <div>Accounts</div>;
};
