var hats = {
	//Rojo
	1: {
		emocion1: 'Satisfaccion',
		emocion2: 'Esperanza'
	},
	//Blanco
	2: {
		emocion1: 'Información',
		emocion2: 'Utilidad',
	},
	//Negro
	3: {
		emocion1: 'Juicio',
		emocion2: 'Cautela',
	},
	//Amarillo
	4: {
		emocion1: 'Beneficios',
		emocion2: 'Felicidad',
	},
	//Verde
	5: {
		emocion1: 'Creatividad',
		emocion2: 'Innovación',
	},
	//Azul
	6: {
		emocion1: 'Control',
		emocion2: 'Integridad',
	}
}

function getSelectedHat(){
	//var selectedHats = document.querySelectorAll('.selectedHat');
	var selectedHats = ['Satisfacción', 'Juicio', 'Cautela'];
	var incidencies = [0, 0, 0, 0, 0, 0];
	var x = Object.keys(hats).length;

	for(var i = 1; i <= x; i++){
		for (var j = 0; j < selectedHats.length; j++) {
			if(hats[i].emocion1 == selectedHats[j] || hats[i].emocion2 == selectedHats[j]){
				incidencies[i-1] = incidencies[i-1] + 1;
			}
		}
	}
	return incidencies.indexOf(Math.max.apply(Math, incidencies)) + 1;
}