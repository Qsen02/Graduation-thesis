import * as yup from "yup";

export const loginShema = yup.object().shape({
    username: yup
        .string()
        .required("Името е задължително!")
        .min(2, "Името или паролата не съвпадат!"),
    password: yup
        .string()
        .required("Паролата е задължителна!")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/,
            "Името или паролата не съвпадат!"
        ),
});

export const registerShema = yup.object().shape({
    username: yup
        .string()
        .required("Името е задължително!")
        .min(2, "Името трябва да бъде с дължина поне 2 символа!"),
    email: yup
        .string()
        .required("Имейла е задължителен!")
        .email("Имейла трябва да бъде валиден!")
        .min(2, "Имейла трябва да е с дължина поне 2 символа!"),
    address: yup
        .string()
        .required("Адреса е задължителен!")
        .min(3, "Адреса трябва да бъде с дължина поне 3 символа!"),
    password: yup
        .string()
        .required("Паролата е задължителна!")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/,
            "Паролата трябва да бъде с дължина поне 6 символа, да има поне 1 специален символ, главна буква и букви и цифри!"
        ),
    repass: yup
        .string()
        .oneOf([yup.ref("password")], "Паролите трябва да съвпадат!")
        .required("Повторната парола е задължителна!"),
});
