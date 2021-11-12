import { auth, db, storage } from './firebaseConfig'


const registrarUsuario = async(nombre, email, password) => {
    try {
        const nuevoUsuario = await auth.createUserWithEmailAndPassword(email, password)
        await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    } catch (error) {
        console.log(error)
        return (error.message)
    }
}


const login = async(email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
        console.log(error)
        return (error.message)
    }
}

const logout = async() => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error)
    }
}


const subirProductoNuevo = async(product) => {
    let resultado
    try {
        console.log('Subiendo...')
        const newProduct = await db.collection('productos').add(product)
        resultado = true
        return { resultado, newProduct }
    } catch (error) {
        console.log(error)
        resultado = false
        return { resultado, error }
    }
}

const SubirImagen = async(nombre) => {
    let resultado
    try {
        const url = await storage.ref("productos").child(nombre).getDownloadURL()
        resultado = true
        return { url, resultado }
    } catch (error) {
        console.log(error)
        resultado = false
        return { error, resultado }
    }
}

export { registrarUsuario, login, logout, subirProductoNuevo, SubirImagen }