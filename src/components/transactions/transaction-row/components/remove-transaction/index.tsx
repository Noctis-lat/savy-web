import { Ban, Minimize2, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";

type RemoveTransactionProps = {
	transaction: Transaction;
	onClose: () => void;
};

export const RemoveTransaction = ({
	transaction,
	onClose,
}: RemoveTransactionProps): React.ReactElement => {
	const [confirm, setConfirm] = useState<boolean>(false);

	const { mutate: deleteTransaction, isPending } = useDeleteTransaction();

	const handleDelete = () => {
		deleteTransaction(transaction.id, {
			onSuccess: () => {
				onClose();
			},
		});
	};

	return (
		<div className="flex flex-row items-center gap-2">
			{confirm ? (
				<>
					<Button
						variant={"outline"}
						onClick={() => setConfirm(false)}
					>
						<Ban />
						Cancelar
					</Button>
					<Button
						variant={"destructive"}
						onClick={handleDelete}
						className="min-w-50"
					>
						{isPending ? (
							<Spinner />
						) : (
							<>
								<Trash2 />
								Confirmar eliminacion
							</>
						)}
					</Button>
				</>
			) : (
				<>
					<Button
						variant={"outline"}
						onClick={onClose}
					>
						<Minimize2 />
						Cerrar
					</Button>
					<Button
						variant={"destructive"}
						onClick={() => setConfirm(true)}
						disabled={isPending}
					>
						<Trash2 />
						Eliminar
					</Button>
				</>
			)}
		</div>
	);
};
