export const accountKeys = {
	accounts: () => ["accounts"] as const,
	accountsByParams: (params?: AccountParams) => [...accountKeys.accounts(), params ?? {}] as const,
	account: (id: string) => [...accountKeys.accounts(), id] as const,
};
