import { useField, useFormikContext } from "formik";

export default function CustomSearchInput({ label, changeHandler, ...props }) {
    const [field, meta] = useField(props);
    const {values}=useFormikContext();

    async function change(e) {
        field.onChange(e);
        await changeHandler(values);
    }

    return (
        <>
            {label ? <label>{label}</label> : ""}
            <input {...field} {...props} onChange={change} />
            {meta.touched && meta.error ? (
                <p className="error">{meta.error}</p>
            ) : (
                ""
            )}
        </>
    );
}
