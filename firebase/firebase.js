import { auth } from './firebaseConfig'


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
    console.log('Login...')
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

export { registrarUsuario, login, logout }