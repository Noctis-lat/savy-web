export const creditCardKeys = {
	creditCards: () => ["credit-cards"] as const,
	creditCardsByParams: (params?: CreditCardParams) =>
		[...creditCardKeys.creditCards(), params ?? {}] as const,
	creditCard: (id: string) => [...creditCardKeys.creditCards(), id] as const,
};
