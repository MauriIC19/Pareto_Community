window.addEventListener("load", init, true);

if(document.getElementById("creditos")){
	document.getElementById("creditos").addEventListener("click",activarModalCreditos);
}

if(document.getElementById("btn-nuevo-problema")){
	document.getElementById("btn-nuevo-problema").addEventListener("click",modalCrearProblemaFuncion);
}

function init(){
	loadProblems();
}

/**
 * Description. Activa el modal de créditos.
*/

function activarModalCreditos(){
	$('#modal_creditos').modal('show');
}


/**
 * Description. Funcion utilizada para cargar los problemas en la página principal
*/
  
function loadProblems(){
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

				cardContenedor = document.createElement("div");
				cardContenedor.classList.add("card");
				cardContenedor.setAttribute("style", "width:18rem;")

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

/**
 * Description. Activacion de la funcionalidad para la creacion de un nuevo problema
 */

function modalCrearProblemaFuncion(){
	modalCrearProblema(1);
}

/**
 * Description. Generación de modales para la creación de un nuevo diagrama
*/

function modalCrearProblema(modal){

	modalTitle = document.getElementById("modal-title");

	modalBody = document.getElementById("modal-body");

	//Limpiamos body
	
	while (modalBody.firstChild) {
    	modalBody.removeChild(modalBody.firstChild);
	}

	switch (modal) {
		case 1:
			
			modalTitle.textContent = "Nuevo Diagrama";

			/*
			
			<div class="row">
								<div class="col-12">
									<p>Para empezar, cuéntanos sobre que temática te interesa llevar a cabo el análisis.</p>
								</div>
								<div class="col-12">
									<input type="text" class="form-control" id="nombreProblema" aria-describedby="emailHelp" placeholder="Ej. La consolidación de mi empresa en...">
								</div>

							</div>

			 */
			


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
			


			break;
		case 2:
			break;
		default:
			// statements_def
			break;
	}

	$('#modal_problemas').modal('show');

}

function createProblems(){
	var nombreProblema = "Problema de prueba estático";
	var autor = "Luis Mauricio";
	var descripcion = "Una descripción estática";
	var factores = getFactors();
	var hat = getSelectedHat();

	var load = new XMLHttpRequest();
	load.open('POST', 'php/createProblems.php');
	load.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	load.send('nombreProblema='+nombreProblema+'&autor='+autor+'&descripcion='+descripcion+'&factores='+factores+'&hat='+hat);

	load.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200) {
			if (this.responseText === '1') {
				console.log('Ok');
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
}