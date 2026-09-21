import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import {
	type UpdateAccountFormValues,
	updateAccountSchema,
} from "@/schemas/accounts/updateAccountSchema";
import { AccountEditForm } from "./components/account-edit-form";
import { AccountEditSubmit } from "./components/account-edit-submit";

type AccountEditProps = {
	account: Account;
};

export const AccountEdit = ({ account }: AccountEditProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const defaultValues: UpdateAccountFormValues = {
		name: account.name,
		bankId: account.bankId ?? undefined,
		balance: Number(account.balance),
		currency: account.currency,
		color: account.color ?? undefined,
		icon: account.icon ?? undefined,
	};

	const accountEditForm = useForm<UpdateAccountFormValues>({
		resolver: zodResolver(updateAccountSchema),
		mode: "onChange",
		defaultValues,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			accountEditForm.reset(defaultValues);
		}
	};

	return (
		<FormProvider {...accountEditForm}>
			<Modal
				icon={Edit3}
				title="Editar cuenta"
				description="Modifica la información de tu cuenta."
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<AccountEditForm />}
				actions={
					<AccountEditSubmit
						accountId={account.id}
						onSuccess={() => handleOpenChange(false)}
					/>
				}
				showCancel
			>
				<Button
					variant="outline"
					onClick={() => setOpen(true)}
				>
					<Edit3 className="size-4" />
					Editar
				</Button>
			</Modal>
		</FormProvider>
	);
};
