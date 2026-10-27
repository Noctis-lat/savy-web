import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { RecurringExpenseManagement } from "@/components/recurring-expenses/recurring-expense-management";
import { serviceKeys } from "@/content/services";
import { useCancelService } from "@/hooks/services/useCancelService";
import { useDeleteServicePermanent } from "@/hooks/services/useDeleteServicePermanent";

type BillManagementProps = {
	service: RecurringExpense;
};

export const BillManagement = ({ service }: BillManagementProps): React.ReactElement => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: deactivateBill, isPending: isDeactivating } = useCancelService();
	const { mutate: deleteBillPermanent, isPending: isDeleting } = useDeleteServicePermanent();

	const handleDeactivate = () => {
		deactivateBill(service.id, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [serviceKeys.service, service.id] });
			},
		});
	};

	const handleDelete = () => {
		deleteBillPermanent(service.id, {
			onSuccess: () => {
				navigate(ROUTES.APP.BILLS.ROOT);
			},
		});
	};

	return (
		<RecurringExpenseManagement
			name={service.name}
			entityLabel="servicio"
			isActive={service.isActive}
			onDeactivate={handleDeactivate}
			onDelete={handleDelete}
			isDeactivating={isDeactivating}
			isDeleting={isDeleting}
		/>
	);
};
