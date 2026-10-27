import { CalendarPlus, Globe, Info, Tag, Wallet } from "lucide-react";
import type React from "react";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { InfoItem } from "@/components/design-system/primitives/info-item";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/formatters/formatDate";

type RecurringExpenseDetailsProps = {
	recurringExpense: RecurringExpense;
	accountName?: string;
	categoryName?: string;
	isLoading?: boolean;
};

export const RecurringExpenseDetails = ({
	recurringExpense,
	accountName,
	categoryName,
	isLoading = false,
}: RecurringExpenseDetailsProps): React.ReactElement => {
	return (
		<SectionCard
			title="Detalles"
			icon={Info}
			className="h-full"
		>
			<div className="mt-4 flex flex-col gap-2">
				{isLoading ? (
					<InfoItem
						icon={Wallet}
						label="Cuenta de cargo"
					>
						<Skeleton className="mt-0.5 h-3 w-28" />
					</InfoItem>
				) : (
					<InfoItem
						icon={Wallet}
						label="Cuenta de cargo"
						value={accountName ?? "Sin cuenta"}
					/>
				)}

				<InfoItem
					icon={Tag}
					label="Categoría"
					value={categoryName ?? "Sin categoría"}
				/>

				{recurringExpense.url && (
					<InfoItem
						icon={Globe}
						label="Sitio web"
						value={recurringExpense.url}
						isLink
					/>
				)}

				<div className="flex flex-col gap-1.5">
					<InfoItem
						icon={CalendarPlus}
						label="Registrado el"
						value={formatDate(recurringExpense.createdAt)}
					/>
					<p className="flex items-start gap-1.5 px-1 text-xs text-muted-foreground">
						<Info
							className="mt-px size-3.5 shrink-0"
							aria-hidden="true"
						/>
						Los cobros anteriores a esta fecha no se reflejarán en tus transacciones.
					</p>
				</div>
			</div>
		</SectionCard>
	);
};
