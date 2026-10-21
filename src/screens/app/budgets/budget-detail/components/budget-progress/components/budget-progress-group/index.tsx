import type React from "react";
import { BudgetProgressRow } from "../budget-progress-row";

type BudgetProgressGroupProps = {
	title: string;
	items: BudgetItemProgress[];
};

export const BudgetProgressGroup = ({
	title,
	items,
}: BudgetProgressGroupProps): React.ReactElement => {
	return (
		<section className="flex flex-col gap-3">
			<h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</h4>
			<ul className="flex flex-col gap-4">
				{items.map((item) => (
					<li key={item.categoryId}>
						<BudgetProgressRow item={item} />
					</li>
				))}
			</ul>
		</section>
	);
};
