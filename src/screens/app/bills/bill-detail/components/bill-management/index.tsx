import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { RecurringExpenseManagement } from "@/components/recurring-expenses/recurring-expense-management";
import { serviceKeys } from "@/content/services";
import { useActivateService } from "@/hooks/services/useActivateService";
import { useCancelService } from "@/hooks/services/useCancelService";
import { useDeleteServicePermanent } from "@/hooks/services/useDeleteServicePermanent";

type BillManagementProps = {
	service: RecurringExpense;
};

export const BillManagement = ({ service }: BillManagementProps): React.ReactElement => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: deactivateBill, isPending: isDeactivating } = useCancelService();
	const { mutate: activateBill, isPending: isActivating } = useActivateService();
	const { mutate: deleteBillPermanent, isPending: isDeleting } = useDeleteServicePermanent();

	const handleDeactivate = () => {
		deactivateBill(service.id, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [serviceKeys.service, service.id] });
			},
		});
	};

	const handleActivate = () => {
		activateBill(service.id, {
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
			onActivate={handleActivate}
			onDelete={handleDelete}
			isDeactivating={isDeactivating}
			isActivating={isActivating}
			isDeleting={isDeleting}
		/>
	);
};
