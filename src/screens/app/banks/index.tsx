import type React from "react";
import { BanksFilters } from "./components/banks-filters";
import { BanksHeader } from "./components/banks-header";
import { BanksKpis } from "./components/banks-kpis";
import { BanksList } from "./components/banks-list";

export const Banks = (): React.ReactElement => {
	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			<BanksHeader />
			<BanksKpis />
			<BanksFilters />
			<BanksList />
		</div>
	);
};
