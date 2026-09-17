import type React from "react";
import { useParams } from "react-router";
import { BankDetailAccounts } from "./components/bank-detail-accounts";
import { BankDetailHeader } from "./components/bank-detail-header";
import { BankDetailHero } from "./components/bank-detail-hero";
import { BankDetailLoans } from "./components/bank-detail-loans";
import { BankDetailSkeleton } from "./components/bank-detail-skeleton";
import { BankDetailTopCategories } from "./components/bank-detail-top-categories";

export const BankDetail = (): React.ReactElement => {
	const { id } = useParams<{ id: string }>();
	const bankId = id ?? "";

	if (!bankId) {
		return <BankDetailSkeleton />;
	}

	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			<BankDetailHeader bankId={bankId} />
			<BankDetailHero bankId={bankId} />
			<BankDetailTopCategories bankId={bankId} />
			<BankDetailAccounts bankId={bankId} />
			<BankDetailLoans bankId={bankId} />
		</div>
	);
};
