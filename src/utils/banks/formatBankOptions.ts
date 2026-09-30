export const formatBankOptions = (banks: Bank[]): Option[] => {
	return banks.map((bank) => ({
		label: bank.name,
		value: bank.id,
	}));
};
