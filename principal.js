
const fs = require("fs");
const opciones = {
  id: { demand: true, alias: "i" },
  nombre: { demand: true, alias: "n" },
  cedula: { demand: true, alias: "c" }
};
const argv = require("yargs").command(
  "inscribir",
  "realizar la inscripcion del curso",
  opciones
).argv;
const express = require("express");
const app = express();

let cursos = [
  {
    id: 1,
    nombre: "fundamentos de Java",
    duracion: "120 horas",
    valor: "$ 300.000"
  },
  {
    id: 2,
    nombre: "Introduccion a  C++",
    duracion: "248 horas",
    valor: "$ 280.000"
  },
  {
    id: 3,
    nombre: "Python Avanzado",
    duracion: "140 horas",
    valor: "$ 480.000"
  },
  {
    id: 4,
    nombre: "introduccion a Angular",
    duracion: "140 horas",
    valor: "$540.000"
  }
];

let mostrarCursos = (curso, callback) => {
  setTimeout(function() {
    let detalleCurso =
      "El curso " +
      curso.nombre +
      "\n" +
      "con ID " +
      curso.id +
      "\n" +
      "tiene una duracion de " +
      curso.duracion +
      "\n" +
      "por un costo de " +
      curso.valor +
      ".\n";
    callback(detalleCurso);
  }, cursos.indexOf(curso) * 2000);
};

let detalleCurso = () => {
  cursos.forEach(function(element) {
    console.log(
      "El curso " +
        element.nombre +
        " con ID " +
        element.id +
        "\n" +
        "tiene una duracion de " +
        element.duracion +
        " por un costo de " +
        element.valor +
        "\n"
    );
  });
};

let generarTexto = (cursoInscrito1, nomInt, ceduInt) => {
  texto =(
    ".\n" +
    "El Estudiante  " +
    nomInt +
    "\n" +
    "con cedula No. " +
    ceduInt +
    "\n" +
    "Se a matriculado en el curso " +
    cursoInscrito1.nombre +
    ",\n" +
    "con una duracion de " +
    cursoInscrito1.duracion +
    ",\n" +
    "por un costo de " +
    cursoInscrito1.valor);

    app.get("/", function(req, res) {
      res.send(texto);
    });
    console.log("Se ha realizado la inscripcion del curso.");

 // fs.writeFile("archivo.txt", texto, err => {
    //if (err) throw err; //});
};

let cursoInscrito = idCurso => cursos.find(element => element.id == idCurso);

let inscribir = (idCurso, nombreInt, cedulaInt) => {
  let miCurso = cursoInscrito(idCurso);

  try {
    if (miCurso.id == idCurso) {
      console.log(
        "El curso " +
          miCurso.nombre +
          " que usted desea incribir, tiene una duracion de " +
          miCurso.duracion +
          ", por un costo de " +
          miCurso.valor +
          "."
      );

      generarTexto(miCurso, nombreInt, cedulaInt);
    }
  } catch (e) {
    console.log("el curso que desea incribir no esta disponible");
    detalleCurso(cursos);
  }
};

if (argv._[0]=='inscribir') {
  inscribir(argv.i, argv.n, argv.c);
} else {
  for (i = 1; i <= cursos.length; i++) {
    mostrarCursos(cursoInscrito(i), function(resultado) {
      console.log(resultado);
    });
  }
}



app.listen(3000);
