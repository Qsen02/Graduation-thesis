import { useField } from "formik";

export default function CustomSelect({ ...props }) {
    const [field, meta] = useField(props);

    return (
        <select {...field} {...props}>
            <option value="name">Име</option>
            <option value="price">Цена</option>
            <option value="category">Категория</option>
        </select>
    );
}
