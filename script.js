const libros = [

    {
        id: 1,
        titulo: "Cien años de soledad",
        disponible: true
    },

    {
        id: 2,
        titulo: "Breve historia del tiempo",
        disponible: true
    },

    {
        id: 3,
        titulo: "El código Da Vinci",
        disponible: true
    },

    {
        id: 4,
        titulo: "Don Quijote de la Mancha",
        disponible: true
    },

    {
        id: 5,
        titulo: "Introducción a la programación",
        disponible: true
    },

    {
        id: 6,
        titulo: "El Principito",
        disponible: true
    },

    {
        id: 7,
        titulo: "Cosmos",
        disponible: true
    },

    {
        id: 8,
        titulo: "Álgebra de Baldor",
        disponible: true
    },

    {
        id: 9,
        titulo: "Orgullo y prejuicio",
        disponible: true
    },

    {
        id: 10,
        titulo: "Harry Potter",
        disponible: true
    }

];


// ELEMENTOS DEL HTML

const catalogo = document.getElementById("catalogoLibros");

const mensaje = document.getElementById("mensaje");

const formulario = document.getElementById("formularioPrestamo");

const nombreUsuario = document.getElementById("nombre");

const libroSeleccionado =
    document.getElementById("libroSeleccionado");

const resultado =
    document.getElementById("resultado");


// CONTADORES

const totalLibros =
    document.getElementById("totalLibros");

const librosDisponibles =
    document.getElementById("librosDisponibles");

const librosPrestados =
    document.getElementById("librosPrestados");


function mostrarCatalogo() {

    // Limpiar catálogo
    catalogo.innerHTML = "";

    // Recorrer los libros
    libros.forEach(function(libro) {

        // Crear tarjeta
        const tarjeta = document.createElement("div");

        tarjeta.classList.add("libro");


        // Determinar estado
        let estadoTexto;
        let claseEstado;

        if (libro.disponible) {

            estadoTexto = "🟢 Disponible";
            claseEstado = "disponible";

        } else {

            estadoTexto = "🔴 No disponible";
            claseEstado = "no-disponible";

        }


        // Crear contenido
        tarjeta.innerHTML = `

            <h3>📖 ${libro.titulo}</h3>

            <p>
                <strong>Número:</strong>
                ${libro.id}
            </p>

            <p class="estado ${claseEstado}">
                ${estadoTexto}
            </p>

            <button
                onclick="seleccionarLibro(${libro.id})"
                ${libro.disponible ? "" : "disabled"}
            >

                ${
                    libro.disponible
                    ? "Solicitar préstamo"
                    : "Libro no disponible"
                }

            </button>

        `;


        // Agregar tarjeta
        catalogo.appendChild(tarjeta);

    });


    actualizarContadores();

    actualizarSelect();

}


function actualizarContadores() {

    let disponibles = 0;

    let prestados = 0;


    libros.forEach(function(libro) {

        if (libro.disponible) {

            disponibles++;

        } else {

            prestados++;

        }

    });


    totalLibros.textContent = libros.length;

    librosDisponibles.textContent = disponibles;

    librosPrestados.textContent = prestados;

}




function actualizarSelect() {

    libroSeleccionado.innerHTML = `

        <option value="">
            Selecciona un libro
        </option>

    `;


    libros.forEach(function(libro) {

        if (libro.disponible) {

            const opcion =
                document.createElement("option");

            opcion.value = libro.id;

            opcion.textContent =
                libro.id + ". " + libro.titulo;

            libroSeleccionado.appendChild(opcion);

        }

    });

}



function seleccionarLibro(id) {

    const libro = libros.find(
        function(libro) {
            return libro.id === id;
        }
    );


    if (libro.disponible) {

        libroSeleccionado.value = libro.id;

        document.getElementById("registro")
            .scrollIntoView({
                behavior: "smooth"
            });

        mensaje.textContent =
            "Has seleccionado: " + libro.titulo;

    } else {

        mensaje.textContent =
            "El libro ya no está disponible.";

    }

}



formulario.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


      
        const nombre =
            nombreUsuario.value.trim();

        const idLibro =
            Number(libroSeleccionado.value);


     
        if (nombre === "" || idLibro === 0) {

            resultado.className = "error";

            resultado.innerHTML = `

                <h3>⚠️ Datos incompletos</h3>

                <p>
                    Debes ingresar tu nombre y
                    seleccionar un libro.
                </p>

            `;

            return;
        }


        // Buscar libro
        const libro = libros.find(
            function(libro) {
                return libro.id === idLibro;
            }
        );


        if (!libro.disponible) {

            resultado.className = "error";

            resultado.innerHTML = `

                <h3>❌ Libro no disponible</h3>

                <p>
                    El libro
                    <strong>${libro.titulo}</strong>
                    ya fue prestado.
                </p>

            `;

            return;
        }

        libro.disponible = false;


 
        resultado.className = "exito";

        resultado.innerHTML = `

            <h3>✅ Préstamo realizado con éxito</h3>

            <p>
                <strong>Usuario:</strong>
                ${nombre}
            </p>

            <p>
                <strong>Libro:</strong>
                ${libro.titulo}
            </p>

            <p>
                <strong>Estado:</strong>
                No disponible
            </p>

            <p>
                El préstamo ha sido registrado
                correctamente.
            </p>

        `;


        // Mensaje general
        mensaje.textContent =
            "El préstamo se realizó correctamente.";


        // Actualizar página
        mostrarCatalogo();


        // Limpiar formulario
        formulario.reset();

    }
);



mostrarCatalogo();
