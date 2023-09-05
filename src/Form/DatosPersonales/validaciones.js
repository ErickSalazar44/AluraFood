export const validarDatosPersonales = (datos) => {
    const length = datos.length;

    return length >= 3 && length < 30 ? true : false;
};

export const validarTelefono = (number) => {
    const validar = /^[09][0-9]{1,7}$/;
    const longitud = number.toString().length;

    return !validar.test(number) && longitud > 8 ? true : false;
};
