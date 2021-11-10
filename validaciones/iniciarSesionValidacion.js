export default function validarIniciarSesion(validar) {
    let errores = {}


    if (!validar.email) {
        errores.email = "El Email es obligatorio"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(validar.email)) {
        errores.email = "email no válido"
    }

    if (!validar.password) {
        errores.password = "El Password es obligatorio"
    } else if (validar.password.length < 6) {
        errores.password = "El Password debe ser de al menos 6 caracteres"
    }

    return errores
}