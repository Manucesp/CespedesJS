
let intentos ;
let contraseña;
let usuarios = [];

let nombre;
let correo;

const cantidadUsuarios = parseInt(prompt("Ingrese la cantidad de usuarios que desea registrar:"));

for (let i = 0; i < cantidadUsuarios; i++) {
     nombre = prompt("Ingrese su nombre:");
     correo = prompt("Ingrese su correo electrónico:");
    
     intentos = 3;

    while (intentos > 0) {
        contraseña = prompt("Ingrese su contraseña ");

        if (contraseña.length <= 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
        } else {
            while(intentos > 0){ 
            validar = prompt("Valide su contraseña tienes " + intentos + " intentos");
            validacion(contraseña, validar);
         }
      }
        if (intentos == 0) {
            alert("Cuenta bloqueada temporalmente, comuníquese con el administrador");
        }
    }
}
console.log("Lista de usuarios registrados:");
console.log(usuarios);

function registrarUsuario(nombre, correo, contraseña) {
    const usuario = {
        nombre: nombre,
        correo: correo,
        contraseña: contraseña
    };
    usuarios.push(usuario);
    alert("Usuario registrado con éxito.");
}

function validacion(contraseña, validar) {
    if (contraseña === validar) {
        alert("Tu contraseña ha sido validada correctamente ");
        registrarUsuario(nombre, correo, contraseña);

        intentos = -1;
    } else {
        alert("Tu contraseña no coincide con la que ingresaste");
        intentos--;
    }
}



