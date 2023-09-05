let intentos = 3;
let contraseña;
let validar;

while (intentos > 0) {
    contraseña = prompt("Ingrese su contraseña ");

    if (contraseña.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
    } else {
        validar = prompt("Valide su contraseña tienes " + intentos + " intentos");
        validacion(contraseña, validar);
    }

    if (intentos == 0) {
        alert("Cuenta bloqueada temporalmente, comuníquese con el administrador");
    }
}

function validacion(contraseña, validar) {
    if (contraseña === validar) {
        alert("Tu contraseña ha sido validada correctamente ");
        intentos = -1;
    } else {
        alert("Tu contraseña no coincide con la que ingresaste");
    }

    intentos--;
}