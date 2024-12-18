import { useField } from "formik";

export default function CustomTextarea({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            {label ? <label>{label}</label> : ""}
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? <p className="error">{meta.error}</p> : ""}
        </>
    );
}
