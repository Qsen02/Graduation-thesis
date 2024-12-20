import { useField } from "formik";

export default function CustomCategorySelect({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <>
            {label ? <label>{label}</label> : ""}
            <select {...field} {...props}>
                <option value="Компютри">Компютри</option>
                <option value="Лаптопи">Лаптопи</option>
                <option value="Телефони">Телефони</option>
                <option value="Мишки и клавиатури">Мишки и клавиатури</option>
                <option value="Тонколони и слушалки">
                    Тонколони и слушалки
                </option>
                <option value="Електроуреди">Електроуреди</option>
                <option value="Други">Други</option>
            </select>
            {meta.touched && meta.error ? <p className="error">{meta.error}</p> : ""}
        </>
    );
}
