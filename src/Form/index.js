import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { LogoSpace, FormSpace, Img } from "./styles";
import Complete from "./Complete";
import Stepper from "../Stepper";
import { validarEmail, validarPassword } from "./DatosUsuario/validaciones";
import MostrarInputs from "./Step";
import {
    validarDatosPersonales,
    validarTelefono,
} from "./DatosPersonales/validaciones";
import {
    validarCiudad,
    validarDireccion,
    validarProvincia,
} from "./DatosEntrega/validaciones";
import confetti from "canvas-confetti";

const Form = () => {
    // Verificar si tiene datos guardados en localStorage

    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    const savedStep = parseInt(localStorage.getItem("currentStep"), 10);

    const [step, setStep] = useState(savedStep || 0);

    const initialFormData = savedFormData || {
        email: { value: "", valid: null },
        password: { value: "", valid: null },
        nombre: { value: "", valid: null },
        apellido: { value: "", valid: null },
        telefono: { value: "", valid: null },
        address: { value: "", valid: null },
        city: { value: "", valid: null },
        state: { value: "", valid: null },
    };

    // Estado para los datos de cada paso
    const [formData, setFormData] = useState(initialFormData);

    // Validación de campos para cada paso
    const stepValidations = [
        () =>
            validarEmail(formData.email.value) &&
            validarPassword(formData.password.value),
        () =>
            validarDatosPersonales(formData.nombre.value) &&
            validarDatosPersonales(formData.apellido.value) &&
            validarTelefono(formData.telefono.value),
        () =>
            validarDireccion(formData.address.value) &&
            validarCiudad(formData.city.value) &&
            validarProvincia(formData.state.value),
    ];

    // cambio de input
    const handleChangeInput = (fieldName, value, validator) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: {
                value,
                valid: validator(value),
            },
        }));
    };

    // envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (stepValidations[step]()) {
            // Avanzar al siguiente paso si los campos son válidos
            setStep((prevStep) => prevStep + 1);

            // guardar cambios en localStorage
            localStorage.setItem("formData", JSON.stringify(formData));
            localStorage.setItem("currentStep", JSON.stringify(step));
        } else {
            console.log("Por favor llenar bien el formulario");
        }

        if (step >= 2 && stepValidations[step]()) {
            // Limpiar localStorage al completar el formulario
            confetti();
            console.log("local storage borrado");
            localStorage.removeItem("formData");
            localStorage.removeItem("currentStep");
        }
    };

    // Datos para los campos de entrada
    const inputFields = {
        0: [
            {
                label: "Email",
                type: "email",
                value: formData.email.value,
                onChange: (value) =>
                    handleChangeInput("email", value, validarEmail),
                valid: formData.email.valid,
                helperText: "Ingresa un correo electrónico válido",
            },
            {
                label: "Password",
                type: "password",
                value: formData.password.value,
                onChange: (value) =>
                    handleChangeInput("password", value, validarPassword),
                valid: formData.password.valid,
                helperText: "Min 8 carácteres y al menos un numero",
            },
        ],
        1: [
            {
                label: "Nombre",
                type: "text",
                value: formData.nombre.value,
                onChange: (value) =>
                    handleChangeInput("nombre", value, validarDatosPersonales),
                valid: formData.nombre.valid,
                helperText: "Minimo 4 carácteres",
            },
            {
                label: "Last Name",
                type: "text",
                value: formData.apellido.value,
                onChange: (value) =>
                    handleChangeInput(
                        "apellido",
                        value,
                        validarDatosPersonales
                    ),
                valid: formData.apellido.valid,
                helperText: "Minimo 4 carácteres",
            },
            {
                label: "Telephone Number",
                type: "number",
                value: formData.telefono.value,
                onChange: (value) =>
                    handleChangeInput("telefono", value, validarTelefono),
                valid: formData.telefono.valid,
                helperText: "Minimo 9 numeros",
            },
        ],
        2: [
            {
                label: "Address",
                type: "text",
                value: formData.address.value,
                onChange: (value) =>
                    handleChangeInput("address", value, validarDireccion),
                valid: formData.address.valid,
                helperText: "Minimo 3 carácteres maximo 30",
            },
            {
                label: "City",
                type: "text",
                value: formData.city.value,
                onChange: (value) =>
                    handleChangeInput("city", value, validarCiudad),
                valid: formData.city.valid,
                helperText: "Minimo 4 carácteres maximo 20",
            },
            {
                label: "State/Province",
                type: "text",
                value: formData.state.value,
                onChange: (value) =>
                    handleChangeInput("state", value, validarProvincia),
                valid: formData.state.valid,
                helperText: "Minimo 4 carácteres maximo 30",
            },
        ],
    };

    return (
        <Box
            sx={{
                padding: {
                    xs: "32px 16px",
                    lg: "40px",
                },
                display: "flexbox",
                flexDirection: "column",
            }}
        >
            <LogoSpace>
                <Img src={"/favicon.png"} />
                <Typography variant='h3'>AluraFood</Typography>
            </LogoSpace>
            <FormSpace>
                {step < 3 && <Stepper step={step} />}
                {step >= 3 ? (
                    <Complete />
                ) : (
                    <MostrarInputs
                        data={inputFields[step]}
                        step={step}
                        onSubmit={handleSubmit}
                    />
                )}
            </FormSpace>
        </Box>
    );
};

export default Form;
