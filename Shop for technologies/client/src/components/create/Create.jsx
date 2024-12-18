import { Form, Formik } from "formik";
import CustomInput from "../../commons/custom-input/CustomInput";
import CustomTextarea from "../../commons/custom-textarea/CustomTextarea";
import CustomCategorySelect from "../../commons/custom-category-select/CustomCategorySelect";

export default function Create() {
    
    return (
        <Formik>
            {(props) => (
                <Form className="form">
                    <h2>Тук може да създадете продукт</h2>
                    <div className="field">
                        <CustomInput label="Име" type="text" name="name" />
                    </div>
                    <div className="field">
                        <CustomInput label="Цена" type="number" name="price" />
                    </div>
                    <div className="field">
                        <CustomInput label="Снимка" type="text" name="imageUrl" />
                    </div>
                    <div className="field">
                        <CustomTextarea label="Описание" type="text" name="description" />
                    </div>
                    <div className="field">
                        <CustomTextarea label="Характеристики" type="text" name="characteristics" />
                    </div>
                    <div className="field">
                        <CustomCategorySelect label="Категория" name="category" />
                    </div>
                    <button type="submit">Създай</button>
                </Form>
            )}
        </Formik>
    );
}
