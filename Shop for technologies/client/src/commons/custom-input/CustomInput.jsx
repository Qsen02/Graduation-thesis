import { useField } from "formik";

export default function CustomInput({ label, ...props }) {
	const [field, meta, helpers] = useField(props);
	const { setValue } = helpers;

	function onChangeHandler(e) {
		if (props.type === "file") {
			setValue(e.currentTarget.files[0]);
		} else {
			field.onChange(e);
		}
	}
	const inputProps =
		props.type === "file"
			? { ...props, onChange: onChangeHandler }
			: { ...field, ...props, onChange: onChangeHandler };

	return (
		<>
			{label ? <label>{label}</label> : ""}
			<input {...inputProps} />
			{meta.touched && meta.error ? (
				<p className="error">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
