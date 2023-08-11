//Declaracion y definicion de las variables
let arrayContacto = [];
let textoMenu = "";
let textoMenu2 = "";
let contar = 0;
let exit = false;
let contacto = "";
let indice;

const fs = require("fs");

fs.readFile("contactos.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  try {
    arrayContacto = JSON.parse(data);
  } catch (error) {
    console.error("Error al parsear el JSON:", error);
  }
});

const { count, log } = require("console");
const readline = require("readline");
const { exitCode } = require("process");

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
  textoMenu = "\n";
  textoMenu += "|=======================================|\n";
  textoMenu += "|\t Lista de contactos\t\t|\n";
  textoMenu += "|=======================================|\n";
  textoMenu += "| 1. Añadir contacto.\t\t\t|\n";
  textoMenu += "| 2. Borrar contacto.\t\t\t|\n";
  textoMenu += "| 3. Actualizar contacto.\t\t|\n";
  textoMenu += "| 4. Mostrar lista de contactos.\t|\n";
  textoMenu += "| 5. Salir.\t\t\t\t|\n";
  textoMenu += "|=======================================|";
  console.log(textoMenu);
  console.log("|=======================================|");
  rl.question("| \tIngrese una opcion: ", (opcion) => {
    console.log("|=======================================|\n");
    seleccion = parseInt(opcion);
    verificar(1, 5, seleccion, parseInt(1));
  });
}

/**
 * Este es un método que ejecuta la peticion solicitada.
 * No retorna ningun valor.
 */
function mostrarMenuInicial(seleccion) {
  // Evaluar la opción seleccionada utilizando switch
  switch (seleccion) {
    case 1:
      crearContacto();
      break;
    case 2:
      eliminarContacto();
      break;
    case 3:
      actualizarContacto();
      break;
    case 4:
      mostrarLista();
      break;
    case 5:
      exit = true;
      salir();
      break;
  }
}
/**
 * Este es un método que ejecuta la peticion solicitada.
 * No retorna ningun valor.
 */
function actualizarNombre() {
  rl.question("Ingrese los nombres para el contacto: ", (nuevoNombre) => {
    arrayContacto[indice].nombre = nuevoNombre;
    console.log("Nombre actualizado correctamente.");

    rl.question(
      "\n¿Desea continuar modificando este contacto? S/N: ",
      (desicion) => {
        let opc = desicion;
        if (opc.toLowerCase() === "s") {
          actualizarContactoActual();
        } else {
          verMenu();
        }
      }
    );
  });
}
function actualizarApellido() {
  rl.question("Ingrese los apellidos para el contacto: ", (nuevoApellido) => {
    arrayContacto[indice].apellido = nuevoApellido;
    console.log("Apellido actualizado correctamente.");

    rl.question(
      "\n¿Desea continuar modificando este contacto? S/N: ",
      (desicion) => {
        let opc = desicion;
        if (opc.toLowerCase() === "s") {
          actualizarContactoActual();
        } else {
          verMenu();
        }
      }
    );
  });
}
function actualizarTelefono() {
  rl.question("Ingrese el telefono para el contacto: ", (nuevoTelefono) => {
    arrayContacto[indice].telefono = nuevoTelefono;
    console.log("Telefono actualizado correctamente.");

    rl.question(
      "\n¿Desea continuar modificando este contacto? S/N: ",
      (desicion) => {
        let opc = desicion;
        if (opc.toLowerCase() === "s") {
          actualizarContactoActual();
        } else {
          verMenu();
        }
      }
    );
  });
}
function actualizarUbicacion() {
  rl.question("Ingrese la ciudad para el contacto: ", (nuevaCiudad) => {
    rl.question("Ingrese la direccion para el contacto: ", (nuevaDireccion) => {
      arrayContacto[indice].ubicacion[0] = nuevaCiudad;
      arrayContacto[indice].ubicacion[1] = nuevaDireccion;
      console.log("Apellido actualizado correctamente.");

      rl.question(
        "\n¿Desea continuar modificando este contacto? S/N: ",
        (desicion) => {
          let opc = desicion;
          if (opc.toLowerCase() === "s") {
            actualizarContactoActual();
          } else {
            verMenu();
          }
        }
      );
    });
  });
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
  rl.question("\nVolver al menu incial=> S / salir => N: ", (desicion) => {
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
  indice = 0;
  const { v4: uuidv4 } = require("uuid");
  const idUnico = uuidv4();

  console.log("Ingrese los datos de contacto:");
  rl.question("Ingrese los nombres: ", (nombre) => {
    rl.question("Ingrese los apellidos: ", (apellido) => {
      rl.question("Ingrese el telefono: ", (telefono) => {
        rl.question("Ingrese la ciudad : ", (ciudad) => {
          rl.question("Ingrese la direccion : ", (direccion) => {
            const nuevoContacto = {
              id: idUnico,
              nombre: nombre,
              apellido: apellido,
              telefono: telefono,
              ubicacion: [ciudad, direccion],
            };
            arrayContacto.push(nuevoContacto);
            indice = arrayContacto.length - 1;
            ñ;
            console.log(arrayContacto[indice]);

            contacto = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";
            contacto += "X Id: " + arrayContacto[indice].id + " \n";
            contacto += "X Nombres: " + arrayContacto[indice].nombre + "\n";
            contacto += "X Apellidos: " + arrayContacto[indice].apellido + "\n";
            contacto += "X Telefono: " + arrayContacto[indice].telefono + "\n";
            contacto +=
              "X Ciudad: " + arrayContacto[indice].ubicacion[0] + "\t\t\tX\n";
            contacto +=
              "X Direccion: " + arrayContacto[indice].ubicacion[1] + "\t\tX\n";
            contacto += "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";
            contacto += "El contacto ha sido creado satisfactoriamente";
            console.log(contacto);

            return setTimeout(salir, 1000);
          });
        });
      });
    });
  });
}

function actualizarContacto() {
  indice = 0;
  textoMenu = "";
  let respuesta = "";
  rl.question(
    "Ingrese el id del contacto que desea actualizar: ",
    (contactoId) => {
      const existir = (arrayContacto) => arrayContacto.id === contactoId;

      indice = arrayContacto.findIndex(existir);

      if (!(indice === -1)) {
        respuesta = "El contacto se puede modificar";
        textoMenu = "\n";
        textoMenu += "|=======================================|\n";
        textoMenu += "|>>\tModificar contacto\t\t|\n";
        textoMenu += "|=======================================|\n";
        textoMenu += "| 1. Nombres.\t\t\t\t|\n";
        textoMenu += "| 2. Apellidos.\t\t\t\t|\n";
        textoMenu += "| 3. Telefono.\t\t\t\t|\n";
        textoMenu += "| 4. Ubicación (Ciudad/Dirección).\t|\n";
        textoMenu += "|=======================================|";
        console.log("\n|=======================================|");
        console.log("| " + respuesta);
        console.log("|=======================================|");

        console.log(arrayContacto[indice]);

        console.log(textoMenu);
      } else {
        respuesta = "El contacto no se puede modificar";
        console.log("|=======================================|");
        console.log("| " + respuesta);
        console.log("|=======================================|");
        salir();
      }
      console.log("|=======================================|");
      rl.question("| Elija la opcion que desea modificar:", (opcion) => {
        console.log("|=======================================|\n");
        seleccion = parseInt(opcion);
        verificar(1, 4, seleccion, parseInt(2));
      });
    }
  );
  return setTimeout(salir, 1000);
}
function actualizarContactoActual() {
  console.log(arrayContacto[indice]);
  textoMenu = "\n";
  textoMenu += "|=======================================|\n";
  textoMenu += "|\tModificar contacto\t\t|\n";
  textoMenu += "|=======================================|\n";
  textoMenu += "| 1. Nombres.\t\t\t\t|\n";
  textoMenu += "| 2. Apellidos.\t\t\t\t|\n";
  textoMenu += "| 3. Telefono.\t\t\t\t|\n";
  textoMenu += "| 4. Ubicación.\t\t\t\t|\n";
  textoMenu += "|=======================================|";
  console.log(textoMenu);
  rl.question("Elija una opcion:", (opcion) => {
    console.log("|=======================================|\n");
    seleccion = parseInt(opcion);
    verificar(1, 4, seleccion, parseInt(2));
    return setTimeout(salir, 1000);
  });
}

function verificar(inicio, fin, seleccion, id) {
  if (!isNaN(seleccion) && seleccion >= inicio && seleccion <= fin) {
    if (id === 1) {
      mostrarMenuInicial(seleccion);
    } else if (id === 2) {
      seleccion === 1
        ? actualizarNombre(indice)
        : seleccion === 2
        ? actualizarApellido(indice)
        : seleccion === 3
        ? actualizarTelefono(indice)
        : actualizarUbicacion(indice);
    }
  } else {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(">>\t\tAlert message\t\t<<");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(">>'" + seleccion + "'" + " No es una opción válida\t\t<<");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n");
    contar++;
    if (contar === 3) {
      console.log("No se permiten más intentos");
      console.log("exit...");
      rl.close();
      process.exit();
    } else {
      console.log("Intento(s) permitido(s): " + (3 - contar));
    }
  }
  return setTimeout(salir, 1000);
}
/**
 * Este es un método que elimina un contacto.
 * @returns {function} Una funcion que recibe dos argumentos: un metodo y el tiempo de ejecucion en milisegundos .
 */
function eliminarContacto() {
  rl.question("Ingrese el id del contacto que desea borrar: ", (id) => {
    let existe = false;
    let mensaje = "";
    let arrayTemp = [];
    for (let i = 0; i < arrayContacto.length; i++) {
      existe = id == arrayContacto[i].id;
      if (existe) {
        arrayTemp.push(arrayContacto[i]);
        console.log(arrayContacto[i]);
        arrayContacto.splice(i, 1);
        break;
      }
    }

    existe
      ? (mensaje = "El contacto se ha elimando por id satisfactoriamente")
      : (mensaje = "El id ingresado no esta asociado a ningun contacto");
    contacto = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";
    contacto += "X Id: " + arrayTemp[0].id + "\n";
    contacto += "X Nombres: " + arrayTemp[0].nombre + "\n";
    contacto += "X Apellidos: " + arrayTemp[0].apellido + "\n";
    contacto += "X Telefono: " + arrayTemp[0].telefono + "\n";
    contacto += "X Ciudad: " + arrayTemp[0].ubicacion[0] + "\n";
    contacto += "X Direccion: " + arrayTemp[0].ubicacion[1] + "\n";
    contacto += "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";
    contacto += mensaje;
    console.log(contacto);
    return setTimeout(salir, 1000);
  });
}

/**
 * Este es un método que muestra todos los contactos.
 * @returns {function} Una funcion que recibe dos argumentos: un metodo y el tiempo de ejecucion en milisegundos .
 */
function mostrarLista() {
  // Función para leer el archivo JSON externo y convertirlo en un arreglo de objetos

  for (let i = 0; i < arrayContacto.length; i++) {
    contacto = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";
    contacto += "X Id: " + arrayContacto[i].id + " \n";
    contacto += "X Nombres: " + arrayContacto[i].nombre + "\n";
    contacto += "X Apellidos: " + arrayContacto[i].apellido + "\n";
    contacto += "X Telefono: " + arrayContacto[i].telefono + "\n";
    contacto += "X Ciudad: " + arrayContacto[i].ubicacion[0] + "\n";
    contacto += "X Direccion: " + arrayContacto[i].ubicacion[1] + "\n";
    contacto += "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";

    console.log(contacto);
  }
  return setTimeout(salir, 3000);
}

verMenu();
