export const formatAccountOptions = (accounts: Account[], excludeId?: string): Option[] => {
	return accounts
		.filter((account) => account.id !== excludeId)
		.map((account) => ({
			label: account.name,
			value: account.id,
		}));
};
