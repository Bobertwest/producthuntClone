export default function validarNuevoProducto(validar) {
    let errores = {}

    if (!validar.nombre) {
        errores.nombre = "EL Nombre es obligatorio"
    }

    if (!validar.empresa) {
        errores.empresa = "LE nombre de la empresa es obligatorio"
    }

    if (!validar.url) {
        errores.url = "La URL del producto es obligatoria"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(validar.url)) {
        errores.url = "URL no válido"
    }

    if (!validar.descripcion) {
        errores.descripcion = "La descripcion es obligatoria"
    }

    return errores
}