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
			{props.type === "file" ? (
				<div className="inputFileWrapper">
					<label htmlFor="imageUrl" className="fileInput">
						Качи снимка
					</label>
					{!field.value ? (
						<p>Няма избран файл</p>
					) : (
						<p>{field.value.name}</p>
					)}
				</div>
			) : (
				""
			)}
			<input {...inputProps} />
			{meta.touched && meta.error ? (
				<p className="error">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
