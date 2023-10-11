
const btn = document.querySelector("#btn");
const btn2 = document.getElementById("btn-2");
const listaGastos = document.getElementById("listaGastos");
const presupuestoInicial = document.getElementById("presupuesto");

const agregarPresupuesto = document.getElementById("presupuesto-restante");

btn2.addEventListener("click", () => {
   
    const container = document.createElement("p")
    container.innerHTML = `
    <p>Presupuesto restante:$ ${presupuestoInicial.value} </p>`;
    
    agregarPresupuesto.appendChild(container);
       
    presupuesto.value = "";

});

    

// Al cargar la página, verifica si hay gastos en el localStorage

window.addEventListener("load", () => {
    const gastosGuardados = JSON.parse(localStorage.getItem("gastos")) || [];
    for (const gasto of gastosGuardados) {
        agregarGastoALaLista(gasto);
    }
});

btn.addEventListener("click", () => {
    agregarGasto();
});

function agregarGasto() {
    const descripcion = document.getElementById("descripcion").value;
    const cantidad = document.getElementById("cantidad").value;

    if (descripcion && cantidad) {
        const nuevoGasto = {
            descripcion,
            cantidad
        };

        agregarGastoALaLista(nuevoGasto);

        // Recupera los gastos existentes del localStorage

        const gastosGuardados = JSON.parse(localStorage.getItem("gastos")) || [];
        gastosGuardados.push(nuevoGasto);

        // Actualiza el localStorage con la nueva lista de gastos
        
        localStorage.setItem("gastos", JSON.stringify(gastosGuardados));

        document.getElementById("descripcion").value = "";
        document.getElementById("cantidad").value = "";
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
        
        const gastosGuardados = JSON.parse(localStorage.getItem("gastos")) || [];
        const index = gastosGuardados.indexOf(gasto);
        if (index !== -1) {
            gastosGuardados.splice(index, 1);
            localStorage.setItem("gastos", JSON.stringify(gastosGuardados));
        }
    });

    listItem.textContent = gasto.descripcion + " $" + gasto.cantidad;
    listItem.appendChild(deleteButton);

    listaGastos.appendChild(listItem);
}

