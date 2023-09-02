export const validarDireccion = (direccion) => {
    return direccion.length >= 3 ? true : false;
};

export const validarCiudad = (ciudad) => {
    return ciudad.length > 3 ? true : false;
};

export const validarProvincia = (provincia) => {
    return provincia.length > 3 ? true : false;
};
