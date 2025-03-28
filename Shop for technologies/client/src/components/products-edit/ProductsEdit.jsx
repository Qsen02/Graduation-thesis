import { Form, Formik } from "formik";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import CustomInput from "../../commons/custom-input/CustomInput";
import CustomTextarea from "../../commons/custom-textarea/CustomTextarea";
import CustomCategorySelect from "../../commons/custom-category-select/CustomCategorySelect";
import { useEditProduct } from "../../hooks/useProducts";
import { createShema } from "../../shemas";
import styles from "./ProductsEdit.module.css";
import { useState } from "react";

export default function ProductsEdit() {
    const { productId } = useParams();
    const {product,setCurProduct,isError,isLoading} =useOutletContext();
    const editThistProduct=useEditProduct();
    const [isSubmitError, setSubmitError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const navigate=useNavigate();

    async function onEdit(value, actions) {
        const name = value.name;
        const price = value.price;
        const imageUrl = value.imageUrl;
        const description = value.description;
        const characteristics = value.characteristics;
        const category = value.category;
        try {
            const newProduct = await editThistProduct(productId, {
                name,
                price,
                imageUrl,
                description,
                characteristics,
                category,
            });
            actions.resetForm();
            setCurProduct(newProduct);
            navigate(`/catalog/${productId}`);
        } catch (err) {
            setSubmitError(true);
            setErrMessage(err.message);
        }
    }

    function onCancel() {
        navigate(`/catalog/${productId}`);
    }

    return (
        <Formik
            initialValues={{
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                description: product.description,
                characteristics: product.characteristics.join(", "),
                category: product.category,
            }}
            validationSchema={createShema}
            onSubmit={onEdit}
            enableReinitialize
        >
            {(props) => (
                <div className="modal">
                    <Form className="form">
                        {isLoading && !isError ? (
                            <span className="loader"></span>
                        ) : isError ? (
                            <h2>
                               Нещо се обърка, моля опитайте по късно!
                            </h2>
                        ) : (
                            <>
                                <h2>Тук може да редактирате вашия продукт</h2>
                                {isSubmitError ? (
                                    <p className="error">{errMessage}</p>
                                ) : (
                                    ""
                                )}
                                <div className="field">
                                    <CustomInput
                                        label="Име"
                                        type="text"
                                        name="name"
                                        placeholder="Samsung Galaxy A50"
                                    />
                                </div>
                                <div className="field">
                                    <CustomInput
                                        label="Цена"
                                        type="number"
                                        name="price"
                                        placeholder="400"
                                    />
                                </div>
                                <div className="field">
                                    <CustomInput
                                        label="Снимка"
                                        type="text"
                                        name="imageUrl"
                                        placeholder="https://image.com"
                                    />
                                </div>
                                <div className="field">
                                    <CustomTextarea
                                        label="Описание"
                                        type="text"
                                        name="description"
                                        placeholder="Много добър телефон"
                                    />
                                </div>
                                <div className="field">
                                    <CustomTextarea
                                        label="Характеристики"
                                        type="text"
                                        name="characteristics"
                                        placeholder="Ram:4GB,Памет:128GB"
                                    />
                                </div>
                                <div className="field">
                                    <CustomCategorySelect
                                        label="Категория"
                                        name="category"
                                    />
                                </div>
                                <div className={styles.buttons}>
                                    <button onClick={onCancel}>Отмени</button>
                                    <button type="submit">Запази</button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            )}
        </Formik>
    );
}
