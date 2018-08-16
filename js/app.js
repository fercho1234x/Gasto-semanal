 // Variables
const presupuestoUsuario = prompt('¿Cual es tu presupuesto semanal?');
let cantidadPresupuesto; // instancia de Presupuesto
const presupuestoSpan = document.querySelector('#total');
const restanteSpan = document.querySelector('#restante');
const formulario = document.querySelector('#agregar-gasto');
// Selectores del formulario
const formNombreGasto = document.querySelector('#gasto');
const formCantidad = document.querySelector('#cantidad');
// listado donde apareceran los gastos
const listado = document.querySelector('.list-group');


 // Clases
 class Presupuesto {
     constructor(presupuesto) {
         this.presupuesto = Number(presupuesto);
         this.restante = Number(presupuesto);
     }

     // Metodos
     // Metodo para ir restando del presupuesto actual
     presupuestoRestante(cantidad = 0){
         return this.restante -= Number(cantidad);
     }
 }

 // Clase para manejar todo lo relacionado con el html
 class Interfaz {
     constructor() {}
     insertarPresupuesto(cantidad = 0){
         presupuestoSpan.innerHTML = `${cantidad}`;
         restanteSpan.innerHTML = `${cantidad}`;
     }

     imprimirMensaje(mensaje, tipoMensaje) {
         const divMensaje = document.createElement('div');
         // divMensaje.classList = tipoMensaje; //Reemplaza todas las clases por la que se le asigna
         // Son necesarios para ambos casos de mensaje Bootstrap
         divMensaje.classList.add('text-center', 'alert');
         if (tipoMensaje === 'error') {
             divMensaje.classList.add('alert-danger');
         }else {
             divMensaje.classList.add('alert-success')
         }
         divMensaje.appendChild(document.createTextNode(mensaje));
         // Agregar mensaje en el DOM
         document.querySelector('.primario').insertBefore(divMensaje, formulario);

         setTimeout(function(){
             divMensaje.remove();
             formulario.reset();
         },1000);
     }

     // Mostrar listado
     agregarListado(nombreGasto, cantidad) {
         // Elemento li
         const li = document.createElement('li');
         // Agregar clases de bootstrap
         li.className = 'list-group-item d-flex justify-content-between aling-items-center';
         // Insertar el gasto
         li.innerHTML = `
            ${nombreGasto}
            <span class="badge badge-primary badge-pill">$${cantidad}</span>
            `;
         listado.appendChild(li);

     }

     // Comprueba el presupuesto restante
     presupuestoRestante(cantidad) {
         const valorRestante = cantidadPresupuesto.presupuestoRestante(cantidad);
         restanteSpan.innerHTML = `${valorRestante}`;
         this.comprobarPresupuesto();
     }

     // Cambia de color por el presupuesto restante
     comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        // Comprobar el 25% del presupuesto
        const restante = document.querySelector('.restante');
        if ( (presupuestoTotal/4) >= presupuestoRestante) {
            restante.classList.remove('alert-success', 'alert-warning');// se le agrega en el 50%
            restante.classList.add('alert-danger');
        } else if ( (presupuestoTotal/2) >= presupuestoRestante) {
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
     }


}

 // Event Listener
document.addEventListener('DOMContentLoaded', function () {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        // Instanciar un presupuesto
         cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
         // Instanciar la clase de interfaz
         const interfaz = new Interfaz();
         interfaz.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

// Event listener para cuando se agregen gastos
formulario.addEventListener('submit',function (e) {
    e.preventDefault();
    const gasto = formNombreGasto.value;
    const cantidad = formCantidad.value;

    // Instancimos un objeto de tipo Interfaz para mostrar error
    const interfaz = new Interfaz();
    if (gasto === '' || cantidad === '') {
        interfaz.imprimirMensaje('Te ha faltado algo en el formulario', 'error');
    }else {
        // Insertar en el HTML
        interfaz.imprimirMensaje('correcto', 'correcto');
        interfaz.agregarListado(gasto, cantidad);
        interfaz.presupuestoRestante(cantidad);

    }
});
