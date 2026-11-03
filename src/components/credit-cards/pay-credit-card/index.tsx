import { CreditCard as CreditCardIcon, Send } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PayCreditCardContent } from "./components/pay-credit-card-content";
import { PayCreditCardSubmit } from "./components/pay-credit-card-submit";

type PayCreditCardProps = {
	creditCard: CreditCard;
	mode?: "button" | "icon";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
	className?: string;
};

export const PayCreditCard = ({
	creditCard,
	mode = "button",
	size = "default",
	className,
}: PayCreditCardProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const [amount, setAmount] = useState<number>(0);
	const [description, setDescription] = useState<string>("");

	const hasPaymentAccount = creditCard.paymentAccountId !== null;

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			setAmount(0);
			setDescription("");
		}
	};

	const trigger =
		mode === "icon" ? (
			<Button
				variant="ghost"
				size="icon-sm"
				disabled={!hasPaymentAccount}
				aria-label={
					hasPaymentAccount ? "Pagar tarjeta" : "Configura una cuenta de pago en la tarjeta"
				}
				className={className}
			>
				<Send className="size-4" />
			</Button>
		) : (
			<Button
				size={size}
				disabled={!hasPaymentAccount}
				className={className}
			>
				<CreditCardIcon className="size-4" />
				Pagar tarjeta
			</Button>
		);

	if (!hasPaymentAccount) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>{trigger}</TooltipTrigger>
				<TooltipContent>Configura una cuenta de pago en la tarjeta</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<Modal
			openModal={open}
			setOpenModal={handleOpenChange}
			title="Pagar tarjeta"
			description={`Pago a ${creditCard.name}`}
			icon={CreditCardIcon}
			iconVariant="blue"
			content={
				<PayCreditCardContent
					creditCard={creditCard}
					onAmountChange={setAmount}
					onDescriptionChange={setDescription}
				/>
			}
			actions={
				<PayCreditCardSubmit
					amount={amount}
					description={description}
					sourceAccountId={creditCard.paymentAccountId as string}
					destinationAccountId={creditCard.accountId}
					isDisabled={amount <= 0}
					onSuccess={() => handleOpenChange(false)}
				/>
			}
			showCancel
		>
			{trigger}
		</Modal>
	);
};
