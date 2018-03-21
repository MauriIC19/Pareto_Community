window.addEventListener("load", init, true);

if(document.getElementById("title-principal-1")){
	document.getElementById("title-principal-1").addEventListener("click",recargarPagina);
}

if(document.getElementById("title-principal-2")){
	document.getElementById("title-principal-2").addEventListener("click",recargarPagina);
}


if(document.getElementById("creditos")){
	document.getElementById("creditos").addEventListener("click",activarModalCreditos);
}

if(document.getElementById("creditos2")){
	document.getElementById("creditos2").addEventListener("click",activarModalCreditos2);
}

if(document.getElementById("btn-nuevo-problema")){
	document.getElementById("btn-nuevo-problema").addEventListener("click",modalCrearProblemaFuncion);
}

if (document.getElementById("btn-votar")) {
	document.getElementById("btn-votar").addEventListener("click", voteFactors);
}

/**
 * Description. Iniciales
*/

function init(){
	$("#alert").hide();
	loadProblems();
}

/**
 * Description. Recarga la página
*/

function recargarPagina(){
	location.reload();
}

/**
 * Description. Activa el modal de créditos.
*/

function activarModalCreditos(){
	$('#modal_creditos').modal('show');
}

/**
 * Description. Activa el modal de créditos2.
*/

function activarModalCreditos2(){
	$('#modal_creditos2').modal('show');
}


/**
 * Description. Funcion utilizada para cargar los problemas en la página principal
*/
  
function loadProblems(){

	cardsConainer = document.getElementById("cards-container");

	while (cardsConainer.firstChild) {
    	cardsConainer.removeChild(cardsConainer.firstChild);
	}

	var load = new XMLHttpRequest();
	load.open('GET', 'php/loadProblems.php');
	load.send();

	load.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200) {
		 	console.log(JSON.parse(this.responseText));

		 	var datos = JSON.parse(this.responseText);

			for (var i = 0; i < datos.length; i++) {
				contenedorPrincipal = document.getElementById("cards-container");

				//Contenedores
				colContenedor = document.createElement("div");
				colContenedor.classList.add("col-4");
				colContenedor.classList.add("top-bottom-margin");

				cardContenedor = document.createElement("div");
				cardContenedor.addEventListener("click", loadProblem);
				cardContenedor.classList.add("card");
				cardContenedor.classList.add("margin-auto");
				cardContenedor.setAttribute("style", "width:18rem;");
				cardContenedor.setAttribute("id", datos[i].idProblema);

				cardBodyContenedor = document.createElement("div");
				cardBodyContenedor.classList.add("card-body");

				//Hijos Finales
				h5CardTitle = document.createElement("h5");
				h5CardTitle.classList.add("card-title");

				h5CardTitleTxt = document.createTextNode(datos[i].nombreProblema);

				pCard = document.createElement("p");

				pCardText = document.createTextNode(datos[i].descripcion);

				h6CardName = document.createElement("h6");
				h6CardName.classList.add("card-subtitle");
				h6CardName.classList.add("mb-2");
				h6CardName.classList.add("text-muted");

				h6CardNameTxt = document.createTextNode(datos[i].autor);

				//Construccion
				
				//Texto
				
				h5CardTitle.appendChild(h5CardTitleTxt);
				pCard.appendChild(pCardText);
				h6CardName.appendChild(h6CardNameTxt);

				//Contenedores
				
				cardBodyContenedor.appendChild(h5CardTitle);
				cardBodyContenedor.appendChild(pCard);
				cardBodyContenedor.appendChild(h6CardName);
				
				cardContenedor.appendChild(cardBodyContenedor);

				colContenedor.appendChild(cardContenedor);

				contenedorPrincipal.appendChild(colContenedor);
			}
		}
	}
}

function loadProblem(){

	var idProblem = this.id;

	var load = new XMLHttpRequest();
	load.open('GET', 'php/loadProblem.php?idProblem='+idProblem);
	load.send();

	load.onreadystatechange = function(){
			if (this.readyState === 4 && this.status === 200) {
			 	resultado = JSON.parse(this.responseText);

			 	console.log(resultado);

			 	factoresArreglo = resultado['factores'];

			 	factoresArreglo.sort((a, b) => parseInt(b.frecuencia) - parseInt(a.frecuencia));

			 	nombresFactores = [];

			 	factoresArreglo.forEach(function(element) {
				    nombresFactores.push(element.nombreFactor);
				});

				frecuenciaFactores = [];

			 	factoresArreglo.forEach(function(element) {
				    frecuenciaFactores.push(parseInt(element.frecuencia));
				});

				paginaPrincipal = document.getElementById("pagina-principal");
				paginaProblemas = document.getElementById("pagina-problema");
				contenedorProblemasVotacion = document.getElementById("contenedor-problemas-votacion");

				paginaPrincipal.classList.add("d-none");
				paginaProblemas.classList.remove("d-none");

				nombreSombrero = document.getElementById("txt-sombrero");

				if (resultado.nombreSombrero == "Blanco") {
					nombreSombrero.textContent = "Sombrero " + resultado.nombreSombrero + ": La persona con el sombrero blanco será la encargada de proveer toda la información necesaria para la toma de la decisión. Esta información será objetiva, neutral y basada en hechos.";
				}

				if (resultado.nombreSombrero == "Rojo") {
					nombreSombrero.textContent = "Sombrero " + resultado.nombreSombrero + ": El sombrero rojo es un sombrero emocional, la persona que se lo pone tiene que argumentar de manera pasional, hablando de lo que le gusta y lo que no, de lo que le da miedo o de las corazonadas que tiene y sentimientos que tiene.";
				}

				if (resultado.nombreSombrero == "Verde") {
					nombreSombrero.textContent = "Sombrero " + resultado.nombreSombrero + ": El sombrero verde es el sombrero de la creatividad, la persona que se ponga este sombrero tendrá que aportar ideas, posibilidades y alternativas creativas para la resolución del asunto tratado.";
				}

				if (resultado.nombreSombrero == "Amarillo") {
					nombreSombrero.textContent = "Sombrero " + resultado.nombreSombrero + ": La persona con el sombrero amarillo tiene que asimilar el rol de persona positiva y optimista. Su objetivo es explorar el lado positivo de las diferentes decisiones y encontrar los beneficios que tendría adoptar cada una de ellas.";
				}

				if (resultado.nombreSombrero == "Negro") {
					nombreSombrero.textContent = "Sombrero " + resultado.nombreSombrero + ":  El sombrero negro es el antagonista del Amarillo. Desde un lado racional tiene que argumentar sobre todo aquello que pueda salir mal, debe encontrar todas las dificultades y el lado negativo de las cosas.";
				}

				if (resultado.nombreSombrero == "Azul") {
					nombreSombrero.textContent = "Sombrero " + resultado.nombreSombrero + ":  El sombrero azul es una especie de moderador, se encarga de guiar la toma de decisiones y de permitir que todo el mundo hable y sea escuchado.";
				}
				
				nombreCatuda = document.getElementById("txt-catuda");
				nombreCatuda.textContent = "Considerando el análisis CATWDA esta problemática considera como elemento esencial: " + resultado.nombreCatuda;

				for (var i = 0; i < factoresArreglo.length; i++) {
					colButton = document.createElement("div");
					colButton.classList.add("col-3");

					buttonProblem = document.createElement("button");
					buttonProblem.setAttribute("type", "button");
					buttonProblem.setAttribute("value", resultado['factores'][i]['idFactor']);
					buttonProblem.classList.add("btn");
					buttonProblem.classList.add("btn-outline-primary");
					buttonProblem.classList.add("btn-block");
					buttonProblem.classList.add("top-bottom-margin");
					buttonProblem.addEventListener("click", marcarBoton);

					buttonProblemTxt = document.createTextNode(resultado['factores'][i]['nombreFactor']);

					//Texto
					
					buttonProblem.appendChild(buttonProblemTxt);

					//Contenido
					
					colButton.appendChild(buttonProblem);

					contenedorProblemasVotacion.appendChild(colButton);
				}

				Highcharts.chart('container', {
				    chart: {
				        renderTo: 'container',
				        type: 'column'
				    },
				    title: {
				        text: resultado['nombreProblema']
				    },
				    xAxis: {
				        categories: nombresFactores
				    },
				    yAxis: [{
				        title: {
				            text: ''
				        }
				    }, {
				        title: {
				            text: ''
				        },
				        minPadding: 0,
				        maxPadding: 0,
				        max: 100,
				        min: 0,
				        opposite: true,
				        labels: {
				            format: "{value}%"
				        }
				    }],
				    series: [{
				        type: 'pareto',
				        name: 'Pareto',
				        yAxis: 1,
				        zIndex: 10,
				        baseSeries: 1
				    }, {
				        name: 'Frecuencia',
				        type: 'column',
				        zIndex: 2,
				        data: frecuenciaFactores
				    }]
				});
			 	
			}
		}

	
}

/**
 * Description. Activacion de la funcionalidad para la creacion de un nuevo problema
 */

function modalCrearProblemaFuncion(){
	modalCrearProblema(1);
}

/**
 * Description. JSON de Información de Problema
*/

informacionProblema = new Object();
informacionProblema.nombreProblema = "";
informacionProblema.autor  = "";
informacionProblema.descripcion = "";
informacionProblemaJSON= JSON.stringify(informacionProblema);

/**
 * Description. Generación de modales para la creación de un nuevo diagrama
 * @param {int} modal Indica el paso en el que se va.
*/

function modalCrearProblema(modal){

	modalTitle = document.getElementById("modal-title");

	modalBody = document.getElementById("modal-body");

	botonSiguiente = document.getElementById("btn-siguiente");

	botonSiguiente.textContent = "Siguiente";

	flagFinish = false;

	//Limpiamos body
	
	while (modalBody.firstChild) {
    	modalBody.removeChild(modalBody.firstChild);
	}

	switch (modal) {
		case 1:
			
			modalTitle.textContent = "Nuevo Diagrama";

			rowPrincipal = document.createElement("div");
			rowPrincipal.classList.add("row");

			colContenedorInstruccion = document.createElement("div");
			colContenedorInstruccion.classList.add("col-12");

			pInstruccion = document.createElement("p");

			pInstruccionTxt = document.createTextNode("Para empezar, cuéntanos sobre que temática te interesa llevar a cabo el análisis.");

			colContenedorInput = document.createElement("div");
			colContenedorInput.classList.add("col-12");

			inputNombreProblema = document.createElement("input");
			inputNombreProblema.setAttribute("type", "text");
			inputNombreProblema.setAttribute("id", "nombreProblema");
			inputNombreProblema.setAttribute("placeholder", "Ej. La consolidación de mi empresa en...")
			inputNombreProblema.classList.add("form-control");

			//Texto
			
			pInstruccion.appendChild(pInstruccionTxt);

			//Contenedor
			
			colContenedorInstruccion.appendChild(pInstruccion);

			colContenedorInput.appendChild(inputNombreProblema);

			rowPrincipal.appendChild(colContenedorInstruccion);
			rowPrincipal.appendChild(colContenedorInput);

			modalBody.appendChild(rowPrincipal);


			botonSiguienteNE = botonSiguiente.cloneNode(true);

			botonSiguiente.parentNode.replaceChild(botonSiguienteNE, botonSiguiente);

			botonSiguienteNE.addEventListener("click",function(){
				informacionProblema.nombreProblema = inputNombreProblema.value;
				botonSiguienteNE.textContent = "Siguiente";
				modalCrearProblema(2);
			});
			

			break;
		case 2:

			modalTitle.textContent = "Descripción";

			rowPrincipal = document.createElement("div");
			rowPrincipal.classList.add("row");

			colContenedorInstruccion = document.createElement("div");
			colContenedorInstruccion.classList.add("col-12");

			pInstruccion = document.createElement("p");

			pInstruccionTxt = document.createTextNode("¡Excelente Tema!, ahora danos una breve descripción del propósito del análisis del mismo.");

			colContenedorInput = document.createElement("div");
			colContenedorInput.classList.add("col-12");

			inputDescripcionProblema = document.createElement("textarea");
			inputDescripcionProblema.setAttribute("type", "text");
			inputDescripcionProblema.setAttribute("id", "descripcion");
			inputDescripcionProblema.setAttribute("placeholder", "Ej. Me interesa identificar cuales son las principales problemáticas de mi negocio...")
			inputDescripcionProblema.classList.add("form-control");

			//Texto
			
			pInstruccion.appendChild(pInstruccionTxt);

			//Contenedor
			
			colContenedorInstruccion.appendChild(pInstruccion);

			colContenedorInput.appendChild(inputDescripcionProblema);

			rowPrincipal.appendChild(colContenedorInstruccion);
			rowPrincipal.appendChild(colContenedorInput);

			modalBody.appendChild(rowPrincipal);


			botonSiguienteNE = botonSiguiente.cloneNode(true);

			botonSiguiente.parentNode.replaceChild(botonSiguienteNE, botonSiguiente);

			botonSiguienteNE.addEventListener("click",function(){
				informacionProblema.descripcion = inputDescripcionProblema.value;
				botonSiguienteNE.textContent = "Siguiente";
				modalCrearProblema(3);
			});

			break;

		case 3:

			modalTitle.textContent = "Datos Generales";

			rowPrincipal = document.createElement("div");
			rowPrincipal.classList.add("row");

			colContenedorInstruccion = document.createElement("div");
			colContenedorInstruccion.classList.add("col-12");

			pInstruccion = document.createElement("p");

			pInstruccionTxt = document.createTextNode("Excelente, todo va muy bien hasta ahora, únicamente falta nos digas tu nombre.");

			colContenedorInput = document.createElement("div");
			colContenedorInput.classList.add("col-12");

			inputNombreUsuario = document.createElement("input");
			inputNombreUsuario.setAttribute("type", "text");
			inputNombreUsuario.setAttribute("id", "autor");
			inputNombreUsuario.setAttribute("placeholder", "Ej. Luis Jorge Lozano Domínguez")
			inputNombreUsuario.classList.add("form-control");

			//Texto
			
			pInstruccion.appendChild(pInstruccionTxt);

			//Contenedor
			
			colContenedorInstruccion.appendChild(pInstruccion);

			colContenedorInput.appendChild(inputNombreUsuario);

			rowPrincipal.appendChild(colContenedorInstruccion);
			rowPrincipal.appendChild(colContenedorInput);

			modalBody.appendChild(rowPrincipal);


			botonSiguienteNE = botonSiguiente.cloneNode(true);

			botonSiguiente.parentNode.replaceChild(botonSiguienteNE, botonSiguiente);

			botonSiguienteNE.addEventListener("click",function(){
				informacionProblema.autor = inputNombreUsuario.value;
				botonSiguienteNE.textContent = "Siguiente";
				modalCrearProblema(4);
			});

			break;

		case 4:

			modalTitle.textContent = "Problemas";

			rowPrincipal = document.createElement("div");
			rowPrincipal.classList.add("row");

			colContenedorInstruccion = document.createElement("div");
			colContenedorInstruccion.classList.add("col-12");

			pInstruccion = document.createElement("p");

			pInstruccionTxt = document.createTextNode("Ahora vamos a enlistar los problemas o deficiencias que identificas en relación al tema que ya planteaste, puedes poner hasta 20.");

			colContenedorInput = document.createElement("div");
			colContenedorInput.classList.add("col-6");

			inputGroupDiv = document.createElement("div");
			inputGroupDiv.classList.add("input-group");

			inputGroup = document.createElement("input");
			inputGroup.setAttribute("type", "text");
			inputGroup.setAttribute("placeholder", "Problema");
			inputGroup.classList.add("form-control");
			inputGroup.classList.add("factor");

			divButton = document.createElement("div");
			divButton.setAttribute("id", "button-add-problem");
			divButton.addEventListener("click", agregarCampoProblema);
			divButton.classList.add("col-6");
			
			buttonElement = document.createElement("button");
			buttonElement.setAttribute("type", "button");
			buttonElement.classList.add("btn");
			buttonElement.classList.add("btn-light");
			buttonElement.classList.add("btn-block");

			buttonElementText = document.createTextNode("Agregar Problema");

			//Texto
			
			pInstruccion.appendChild(pInstruccionTxt);
			buttonElement.appendChild(buttonElementText);

			//Contenedor
			
			colContenedorInstruccion.appendChild(pInstruccion);

			colContenedorInput.appendChild(inputGroupDiv);

			inputGroupDiv.appendChild(inputGroup);

			divButton.appendChild(buttonElement);

			rowPrincipal.appendChild(colContenedorInstruccion);
			rowPrincipal.appendChild(colContenedorInput);
			rowPrincipal.appendChild(divButton);

			modalBody.appendChild(rowPrincipal);


			botonSiguienteNE = botonSiguiente.cloneNode(true);

			botonSiguiente.parentNode.replaceChild(botonSiguienteNE, botonSiguiente);

			botonSiguienteNE.addEventListener("click",function(){
				botonSiguienteNE.textContent = "Siguiente";
				factores = getFactors();
				modalCrearProblema(5);
			});

			break;

		case 5:

			emocionesArray = ["Satisfacción", "Esperanza", "Información", "Utilidad", "Juicio", "Cautela", "Beneficios", "Felicidad", "Creatividad", "Innovación", "Control", "Integridad"];

			modalTitle.textContent = "Ya estamos por terminar";

			rowPrincipal = document.createElement("div");
			rowPrincipal.classList.add("row");

			colContenedorInstruccion = document.createElement("div");
			colContenedorInstruccion.classList.add("col-12");

			pInstruccion = document.createElement("p");

			pInstruccionTxt = document.createTextNode("¿Cuáles de las siguientes emociones están relacionadas con la problemática que planteas?");

			//Texto
			
			pInstruccion.appendChild(pInstruccionTxt);
			
			//Contenedor

			colContenedorInstruccion.appendChild(pInstruccion);

			rowPrincipal.appendChild(colContenedorInstruccion);

			emocionesArray.forEach(function(elemento){
 				colContenedorCheck = document.createElement("div");
	 			colContenedorCheck.classList.add("col-4");

	 			formCheckDiv = document.createElement("div");
	 			formCheckDiv.classList.add("form-check");

	 			inputCheck = document.createElement("input");
	 			inputCheck.addEventListener("click", checkMaxNumberCheck);
	 			inputCheck.setAttribute("value", elemento);
	 			inputCheck.setAttribute("id", elemento);
	 			inputCheck.setAttribute("type", "checkbox");
	 			inputCheck.classList.add("form-check-input");

	 			labelCheck = document.createElement("label");
	 			labelCheck.setAttribute("for", elemento);

	 			labelCheck1Text = document.createTextNode(elemento);

	 			//Texto

	 			labelCheck.appendChild(labelCheck1Text);

	 			//Contenedor

	 			formCheckDiv.appendChild(inputCheck);
				formCheckDiv.appendChild(labelCheck);

				colContenedorCheck.appendChild(formCheckDiv);

				rowPrincipal.appendChild(colContenedorCheck);
 			});

			
			modalBody.appendChild(rowPrincipal);

			botonSiguienteNE = botonSiguiente.cloneNode(true);

			botonSiguiente.parentNode.replaceChild(botonSiguienteNE, botonSiguiente);

			botonSiguienteNE.addEventListener("click",function(){
				botonSiguienteNE.textContent = "Siguiente";
				hat = getSelectedHat();
				modalCrearProblema(6);
			});

			break;

		case 6:

			emocionesArray = ["Operación", "Beneficia", "Alguién", "Tú", "Transformar", "Procesos", "Enfoque", "Visión", "Propietario", "Decisión", "Política", "Organización"];

			modalTitle.textContent = "Una última cosa";

			rowPrincipal = document.createElement("div");
			rowPrincipal.classList.add("row");

			colContenedorInstruccion = document.createElement("div");
			colContenedorInstruccion.classList.add("col-12");

			pInstruccion = document.createElement("p");

			pInstruccionTxt = document.createTextNode("Selecciona los elementos que influyen en mayor medida en la problemática que planteas (Escoge máximo 4)");

			//Texto
			
			pInstruccion.appendChild(pInstruccionTxt);
			
			//Contenedor

			colContenedorInstruccion.appendChild(pInstruccion);

			rowPrincipal.appendChild(colContenedorInstruccion);

			emocionesArray.forEach(function(elemento){
 				colContenedorCheck = document.createElement("div");
	 			colContenedorCheck.classList.add("col-4");

	 			formCheckDiv = document.createElement("div");
	 			formCheckDiv.classList.add("form-check");

	 			inputCheck = document.createElement("input");
	 			inputCheck.addEventListener("click", checkMaxNumberCheck);
	 			inputCheck.setAttribute("value", elemento);
	 			inputCheck.setAttribute("id", elemento);
	 			inputCheck.setAttribute("type", "checkbox");
	 			inputCheck.classList.add("form-check-input");

	 			labelCheck = document.createElement("label");
	 			labelCheck.setAttribute("for", elemento);

	 			labelCheck1Text = document.createTextNode(elemento);

	 			//Texto

	 			labelCheck.appendChild(labelCheck1Text);

	 			//Contenedor

	 			formCheckDiv.appendChild(inputCheck);
				formCheckDiv.appendChild(labelCheck);

				colContenedorCheck.appendChild(formCheckDiv);

				rowPrincipal.appendChild(colContenedorCheck);
 			});

			
			modalBody.appendChild(rowPrincipal);

			botonSiguienteNE = botonSiguiente.cloneNode(true);

			botonSiguiente.parentNode.replaceChild(botonSiguienteNE, botonSiguiente);

			botonSiguienteNE.textContent = "";
			botonSiguienteNE.textContent = "Terminar"

			botonSiguienteNE.addEventListener("click",function(){
				cat = getSelectedCatuda();
				modalCrearProblema(7);
			});

			break;

		case 7:
			createProblems();
			$('#modal_problemas').modal('toggle');
			$("#alert").show();
			flagFinish = true;
			break;
		default:
			// statements_def
			break;
	}

	if(flagFinish==false){
		$('#modal_problemas').modal('show');
	}
	

}

/**
 * Description. Variable para contar la cantidad de problemas que han sido agregados.
*/

contadorProblemas = 1;

/**
 * Description. Agrega un nuevo input para poder escribir una problemática del problema que está siendo creado. 
*/

function agregarCampoProblema(){

	buttonAddProblem = document.getElementById("button-add-problem");

	if(contadorProblemas < 20){

		colPrincipal6 = document.createElement("div");
		colPrincipal6.classList.add("col-6");

		inputGroupDiv = document.createElement("div");
		inputGroupDiv.classList.add("input-group");

		inputGroup = document.createElement("input");
		inputGroup.setAttribute("type", "text");
		inputGroup.setAttribute("placeholder", "Problema");
		inputGroup.classList.add("form-control");
		inputGroup.classList.add("factor");

		deleteInputDiv = document.createElement("div");
		deleteInputDiv.classList.add("input-group-append");

		spanDeleteInput = document.createElement("span");
		spanDeleteInput.classList.add("input-group-text");
		spanDeleteInput.addEventListener("click", eliminarCampoProblema);

		spanDeleteInputText = document.createTextNode("x");

		//Unimos Texto
		
		spanDeleteInput.appendChild(spanDeleteInputText);

		//Unimos Contenido 
		
		deleteInputDiv.appendChild(spanDeleteInput);

		inputGroupDiv.appendChild(inputGroup);
		inputGroupDiv.appendChild(deleteInputDiv);

		colPrincipal6.appendChild(inputGroupDiv);

		buttonAddProblem.parentNode.insertBefore(colPrincipal6, buttonAddProblem);

		contadorProblemas++;
	}

	if(contadorProblemas==20){
		buttonAddProblem.classList.add("d-none");
	}
}

/**
 * Description. Elimina un input de las diversas problemáticas que están siendo creadas referentes a la problemática en creación. 
*/

function eliminarCampoProblema(){
	this.parentNode.parentNode.parentNode.remove();
	
	contadorProblemas--;

	if(contadorProblemas<20){
		buttonAddProblem.classList.remove("d-none");
	}
}

/**
 * Description. Cuenta la cantidad de inputs de tipo checkbox estan marcados limitando la cantidad máxima a 4
*/

function checkMaxNumberCheck(){
	contadorChecks = 0;

	 checks = document.querySelectorAll("input[type=checkbox]");

	for(i = 0; i < checks.length; i++){
		if(checks[i].checked && checks[i].name == this.name){
			contadorChecks++;
		}
	}

	if(contadorChecks > 4){
		this.checked = false;
	}
}

function marcarBoton(){
	botonClick = this;

	botonClick.classList.toggle("btn-outline-primary");
	botonClick.classList.toggle("btn-primary");
	botonClick.classList.toggle("voted");
}

function createProblems(){
	var nombreProblema = informacionProblema.nombreProblema;
	var autor = informacionProblema.autor;
	var descripcion = informacionProblema.descripcion;

	var load = new XMLHttpRequest();
	load.open('POST', 'php/createProblems.php');
	load.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	load.send('nombreProblema='+nombreProblema+'&autor='+autor+'&descripcion='+descripcion+'&factores='+factores+'&hat='+hat+'&cat='+cat);

	load.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200) {
			if (this.responseText === '1') {
				console.log('Ok');
				loadProblems();
			}
			else{
				console.log(this.responseText);
			}
		}
	}


}

function getFactors(){
	var factors = document.querySelectorAll('.factor');
	var factorsArray = Array();

	for(var i = 0; i < factors.length; i++){
		factorsArray.push(factors[i].value);
	}
	return factorsArray.toString();
}

function voteFactors(){
	var votedFactors = document.querySelectorAll('.voted');
	var votedFactorsArray = Array();

	for(var i = 0; i < votedFactors.length; i++){
		votedFactorsArray.push(votedFactors[i].value);
	}

	votedFactorsArray.toString();

	var voteFactors = new XMLHttpRequest();
	voteFactors.open('POST', 'php/voteFactors.php');
	voteFactors.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	voteFactors.send('voteFactors='+votedFactorsArray);

	voteFactors.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200) {
			if (this.responseText === '1') {
				console.log('Ok');
				loadProblems();
			}
			else{
				console.log(this.responseText);
			}
		}
	}

	location.reload();
}
 