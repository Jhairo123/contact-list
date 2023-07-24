//Declaracion y definicion de las variables
let arrayContacto = [];
let textoMenu = "";
let contar = 0;
let exit = false;

//Este arreglo tiene dos elementos, y cada elemento es un objeto que contiene las propiedades nombre y apellido con sus respectivos valores.
arrayContacto = [
  {
    nombre: "Juan",
    apellido: "Gomez",
  },
  {
    nombre: "Miles",
    apellido: "Morales",
  },
];

const { count } = require("console");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Este es un método que concatena el texto que corresponde al menu.
 * No retorna ningun valor.
 */
function verMenu() {
  let seleccion;
  textoMenu = "|=======================================|\n";
  textoMenu += "|\t Lista de contactos\t\t|\n";
  textoMenu += "|=======================================|\n";
  textoMenu += "| 1. Añadir contacto.\t\t\t|\n";
  textoMenu += "| 2. Borrar contacto.\t\t\t|\n";
  textoMenu += "| 3. Mostrar lista de contactos.\t|\n";
  textoMenu += "| 4. Salir.\t\t\t\t|\n";
  textoMenu += "|=======================================|";

  console.log(textoMenu);
  rl.question("\tIngrese una opcion: ", (opcion) => {
    console.log("|=======================================|\n");
    seleccion = parseInt(opcion);
    if (!isNaN(seleccion) && seleccion > 0 && seleccion < 5) {
      //console.log(seleccion + isNaN(seleccion));
      realizarPeticion(seleccion);
    } else {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(">>\t\tAlert message\t\t<<");
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(">>' " + opcion + "'" + " No es una opción válida\t\t<<");
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n");
      contar++;
      if (contar === 3) {
        console.log("No se permiten más intentos");
        console.log("Exit...");
        rl.close();
        process.exit();
      } else {
        console.log("Intento(s) permitido(s): " + (3 - contar));
      }
      setTimeout(verMenu, 2000);
    }
  });
}

/**
 * Este es un método que ejecuta la peticion solicitada.
 * No retorna ningun valor.
 */
function realizarPeticion(seleccion) {
  // Evaluar la opción seleccionada utilizando switch
  switch (seleccion) {
    case 1:
      crearContacto();
      break;
    case 2:
      eliminarContacto();
      break;
    case 3:
      mostrarLista();
      break;
    case 4:
      exit = true;
      salir();
      break;
  }
}
/**
 * Este es un método que permite finalizar el programa o volver al menu
 * No retorna ningun valor.
 */
function salir() {
  if (exit) {
    console.log("Exit...");
    rl.close();
    process.exit();
  }
  rl.question("\n¿Desea volver al menu anterior? S/N: ", (desicion) => {
    let opc = desicion;
    if (opc.toLowerCase() === "s") {
      verMenu();
    } else {
      console.log("Exit...");
      rl.close();
      process.exit();
    }
  });
}

/**
 * Este es un método que crea un contacto.
 * @returns {function} Una funcion que recibe dos argumentos: un metodo y el tiempo de ejecucion en milisegundos .
 */
function crearContacto() {
  rl.question("Ingrese el contacto que desea guardar: ", (nombre) => {
    let repeticion = false;
    let completo = nombre.includes(" ");
    let nombreCompleto = nombre.split(" ");
    for (let i = 0; i < arrayContacto.length && !repeticion; i++) {
      let cadena = arrayContacto[i].nombre + " " + arrayContacto[i].apellido;
      repeticion = nombre.toLowerCase() === cadena.toLowerCase();
    }
    if (repeticion) {
      console.log("El contacto no se puede crear porque el contacto ya existe");
      repeticion = false;
    } else if (!completo) {
      console.log("El contacto debe contener un apellido para ser guardado");
    } else {
      const contacto = {
        nombre: nombreCompleto[0],
        apellido: nombreCompleto[1],
      };
      arrayContacto.push(contacto);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(">>\t\t" + nombre + "\t\t<<");
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log("El contacto ha sido creado satisfactoriamente");
    }
    return setTimeout(salir, 1000);
  });
}

/**
 * Este es un método que elimina un contacto.
 * @returns {function} Una funcion que recibe dos argumentos: un metodo y el tiempo de ejecucion en milisegundos .
 */
function eliminarContacto() {
  rl.question("Ingrese el contacto que desea borrar: ", (nombre) => {
    let repeticion = false;
    let completo = nombre.includes(" ");
    let indice;
    if (!completo) {
      console.log("El contacto debe contener un apellido para ser eliminado");
    } else {
      for (let i = 0; i < arrayContacto.length && !repeticion; i++) {
        let cadena = arrayContacto[i].nombre + " " + arrayContacto[i].apellido;
        repeticion = nombre.toLowerCase() === cadena.toLowerCase();
        repeticion == true ? (indice = i) : (indice = -1);
        // console.log(cadena);
      }
      if (!repeticion) {
        console.log(
          "El contacto no se puede eliminar porque el contacto no existe"
        );
        repeticion = false;
      } else if (!completo) {
        console.log("El contacto debe contener un apellido para ser eliminado");
      } else {
        arrayContacto.splice(indice, 1);
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log(">>\t\t" + nombre + "\t\t<<");
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("El contacto ha sido eliminado satisfactoriamente");
      }
    }
    return setTimeout(salir, 1000);
  });
}

/**
 * Este es un método que muestra todos los contactos.
 * @returns {function} Una funcion que recibe dos argumentos: un metodo y el tiempo de ejecucion en milisegundos .
 */
function mostrarLista() {
  for (let i = 0; i < arrayContacto.length; i++) {
    let contacto = arrayContacto[i].nombre + " " + arrayContacto[i].apellido;
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(">>\t\t" + contacto + "\t\t<<");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  }
  return setTimeout(salir, 3000);
}

verMenu();
