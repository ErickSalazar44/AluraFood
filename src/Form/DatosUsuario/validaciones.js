export const validarEmail = (email) => {
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(email)) return true;
    return false;
};

export const validarPassword = (password) => {
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (validPassword.test(password)) return true;
    return false;
};
