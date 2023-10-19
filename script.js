
const btn = document.querySelector("#btn");
const btn2 = document.getElementById("btn-2");
const listaGastos = document.getElementById("listaGastos");
const presupuestoInicial = document.getElementById("presupuesto");
const presupuestoRestante = document.getElementById("presupuesto-restante");

const dolarInfo = document.getElementById("dolar-info");

let presupuesto = parseFloat(localStorage.getItem("presupuesto")) || 0;
let gastosGuardados = JSON.parse(localStorage.getItem("gastos")) || [];


btn2.addEventListener("click", () => {
    presupuesto = parseFloat(presupuestoInicial.value);
    actualizarPresupuesto();

    presupuestoInicial.disabled = true;
    localStorage.setItem("presupuesto", presupuesto);
});

// Al cargar la página, verifica si hay gastos en el localStorage

window.addEventListener("load", () => {
    actualizarPresupuesto();
    if(gastosGuardados.length > 0){ 
    for (const gasto of gastosGuardados) {
        agregarGastoALaLista(gasto);
    }
    actualizarPresupuesto();
   };
    obtenerCotizacionDolar();
});

btn.addEventListener("click", () => {
    agregarGasto();
});


function agregarGasto() {
    const descripcion = document.getElementById("descripcion").value;
    const cantidad = document.getElementById("cantidad").value;


    if (descripcion && !isNaN(cantidad) && cantidad > 0 ) {
        const nuevoGasto = {
            descripcion,
            cantidad
        };
        
        agregarGastoALaLista(nuevoGasto);
        presupuesto -= cantidad;
        gastosGuardados.push(nuevoGasto);
        localStorage.setItem("gastos", JSON.stringify(gastosGuardados));
        localStorage.setItem("presupuesto", presupuesto);

        document.getElementById("descripcion").value = "";
        document.getElementById("cantidad").value = "";
        actualizarPresupuesto();
    }
}

function agregarGastoALaLista(gasto) {
    let listItem = document.createElement("li");
    let deleteButton = document.createElement("button");

    deleteButton.className = "delete-button";
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
        listaGastos.removeChild(listItem);

        // Elimina el gasto del localStorage
        const index = gastosGuardados.indexOf(gasto);
        if (index !== -1) {
            gastosGuardados.splice(index, 1);
            localStorage.setItem("gastos", JSON.stringify(gastosGuardados));
        
            //Suma el gasto al presupuesto al eliminar
            presupuesto += parseFloat(gasto.cantidad);
            localStorage.setItem("presupuesto", presupuesto);
            actualizarPresupuesto();
        }
    });

    listItem.textContent = gasto.descripcion + " $" + gasto.cantidad;
    listItem.appendChild(deleteButton);

    listaGastos.appendChild(listItem);
}
function actualizarPresupuesto(){
    const presupuestoActual = parseFloat(localStorage.getItem("presupuesto")) || 0;
    presupuestoRestante.innerText = `Presupuesto restante: $ ${presupuestoActual}`;
};

const url = 'https://open.er-api.com/v6/latest/USD';

function obtenerCotizacionDolar(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const cotizacionDolar = data.rates.ARS;
        dolarInfo.textContent = `Cotizacion del dolar: $ ${cotizacionDolar}`;
    })
    .catch(error => {
        console.error("Error al obtener la cotizacion del dolar:", error);
    })
};