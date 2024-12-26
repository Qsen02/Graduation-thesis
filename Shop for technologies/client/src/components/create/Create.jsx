import { Form, Formik } from "formik";
import CustomInput from "../../commons/custom-input/CustomInput";
import CustomTextarea from "../../commons/custom-textarea/CustomTextarea";
import CustomCategorySelect from "../../commons/custom-category-select/CustomCategorySelect";
import { createShema } from "../../shemas";
import { useCreateProduct } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Create() {
    const createProduct=useCreateProduct();
    const navigate=useNavigate();
    const [isError,setIsError]=useState(false);
    const [errMessage,setErrMessage]=useState("");

    async function onCreate(value,actions){
         const name=value.name;
         const price=value.price;
         const imageUrl=value.imageUrl;
         const description=value.description;
         const characteristics=value.characteristics;
         const category=value.category;
         try{
            await createProduct({name,price,imageUrl,description,characteristics,category});
            actions.resetForm();
            navigate("/catalog");
         }catch(err){
            setIsError(true);
            setErrMessage(err.message);
         }
    }

    return (
        <Formik 
            initialValues={{
                name:"",
                price:"",
                imageUrl:"",
                description:"",
                characteristics:"",
                category:""
            }} 
            validationSchema={createShema}
            onSubmit={onCreate}
        >
            {(props) => (
                <Form className="form">
                    <h2>Тук може да създадете продукт</h2>
                    {isError ? <p className="error">{errMessage}</p> : ""}
                    <div className="field">
                        <CustomInput label="Име" type="text" name="name" placeholder="Samsung Galaxy A50"/>
                    </div>
                    <div className="field">
                        <CustomInput label="Цена" type="number" name="price" placeholder="400"/>
                    </div>
                    <div className="field">
                        <CustomInput label="Снимка" type="text" name="imageUrl" placeholder="https://image.com"/>
                    </div>
                    <div className="field">
                        <CustomTextarea label="Описание" type="text" name="description" placeholder="Много добър телефон"/>
                    </div>
                    <div className="field">
                        <CustomTextarea label="Характеристики" type="text" name="characteristics" placeholder="Ram:4GB,Памет:128GB"/>
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
