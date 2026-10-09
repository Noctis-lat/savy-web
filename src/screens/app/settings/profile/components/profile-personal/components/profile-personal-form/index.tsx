import type React from "react";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import type { ProfilePersonalFormValues } from "@/schemas/profile/profilePersonalSchema";
import { focusFirstField } from "@/utils/ui/focusFirstField";

export const ProfilePersonalForm = (): React.ReactElement => {
	const profilePersonalForm = useFormContext<ProfilePersonalFormValues>();
	const fieldsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		focusFirstField(fieldsRef.current);
	}, []);

	return (
		<div
			ref={fieldsRef}
			className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4"
		>
			<FormField
				name="firstName"
				form={profilePersonalForm}
				label="Nombre"
				placeholder="Tu nombre"
				required
			/>
			<FormField
				name="lastName"
				form={profilePersonalForm}
				label="Primer apellido"
				placeholder="Tu primer apellido"
				required
			/>
			<FormField
				name="secondLastName"
				form={profilePersonalForm}
				label="Segundo apellido"
				placeholder="Tu segundo apellido"
				optional
			/>
			<FormField
				name="phone"
				form={profilePersonalForm}
				type="tel"
				label="Teléfono"
				placeholder="55 1234 5678"
				optional
			/>
		</div>
	);
};
