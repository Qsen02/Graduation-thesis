import { useField } from "formik";

export default function CustomInput({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            {label ? <label>{label}</label> : ""}
            <input {...field} {...props} />
            {meta.touched && meta.error ? <p className="error">{meta.error}</p> : ""}
        </>
    );
}
