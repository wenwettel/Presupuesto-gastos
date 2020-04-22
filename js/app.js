// Variables

const presupuestoUsuario = prompt('¿Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;



// CLases

//Clase Presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    // Metodo para ir restando del presupuesto actual
    presupuestoRestante(cantidad=0) {
        return this.restante -= Number(cantidad);
    }
}

// Clase de Interfaz maneja todo lo relacionado a el HTML

class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('#total');
        const restanteSpan = document.querySelector('#restante');

        // Insertar al HTML

        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
        
    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));

        //Insertar en el DOM 
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //quitar el alert despues de 3 seg.

        setTimeout(function(){
            document.querySelector('.primario .alert').remove()
            formulario.reset();
        }, 3000);
    }
    // Inserta los gastos a la lista; 2 parametros : Gasto, cantidad
    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul')

        //crear un Li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between aling-intems-center';

        //Insertar gasto
        li.innerHTML = `
        ${nombre}
        <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
        `;

        //Insertar la HTML 
        gastosListado.appendChild(li);
    }

    // Comprueba el presupuesto restante
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('#restante');
        //leemos el presupuesto restante (actualizarlo)
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestanteUsuario}`;
        
        this.comprobarPresupuesto();
    }

    // Cambia de color el presupuesto restante

    comprobarPresupuesto() {
       const presupuestoTotal = cantidadPresupuesto.presupuesto;
       const presupuestoRestante = cantidadPresupuesto.restante;
        
        //Comprobar el 25%
        if((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((presupuestoTotal / 2 ) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}







// Event Listeners
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    } else {
        //instanciar presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

        // instanciar la clase de Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
        
        
    }
});

formulario.addEventListener('submit' , function(e) {
    e.preventDefault();
   
    // Leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // Instanciar la Interfaz
    const ui = new Interfaz();

    // Comprobar que los campos no esten vacios
    if(nombreGasto === '' || cantidadGasto === '') {
        // dos parametros: mensaje y tipo
        ui.imprimirMensaje('Hubo un Error', 'error');

    }else {
        // Insertar en el HTML

        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
    
});