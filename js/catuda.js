var catuda = {
	//Clientes
	1: {
		cat1: 'Operación',
		cat2: 'Beneficia'
	},
	//Actores
	2: {
		cat1: 'Alguien',
		cat2: 'Tú',
	},
	//Transformaciones
	3: {
		cat1: 'Transformar',
		cat2: 'Procesos',
	},
	//Weltanschaung
	4: {
		cat1: 'Enfoque',
		cat2: 'Visión',
	},
	//Dueños
	5: {
		cat1: 'Propietario',
		cat2: 'Decisión',
	},
	//Ambiente
	6: {
		cat1: 'Política',
		cat2: 'Organización',
	}
}

function getSelectedCatuda(){
	var selectedCat = document.querySelectorAll('.selectedCat');
	var incidencies = [0, 0, 0, 0, 0, 0];
	var x = Object.keys(catuda).length;

	for(var i = 1; i <= x; i++){
		for (var j = 0; j < selectedCat.length; j++) {
			if(catuda[i].cat1 == selectedHats[j] || catuda[i].cat2 == selectedHats[j]){
				incidencies[i-1] = incidencies[i-1] + 1;
			}
		}
	}
	return incidencies.indexOf(Math.max.apply(Math, incidencies)) + 1;
}