// Declaration des variables

var tab;
var score = 0;
var lignes = 4; 
var colonnes = 4; 

// window.onload sert à attendre que la page soit prête 
// avant de lancer le code afin d'eviter les err

window.onload = function(){
	initGame();
}

function initGame() {
	tab =[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];


	for (let i = 0; i < lignes; i++) {
		for (let j = 0; j < colonnes; j++) {

			let cases = document.createElement("div");		
			cases.id = i.toString() + "-" + j.toString();

			//crée un identifiant unique pour chaque case du jeu 
			//en combinant la ligne et la colonne sous forme de text

			let num = tab[i][j];

			// fonction de mise a jour
			M_A_J_Case(cases,num);

			// sélectionne un élément HTML grâce à son attribut
			document.getElementById("tab").append(cases);			

		}
	}

	// appel de la fonction pour démarer le jeux

	init_a_Deux();
	init_a_Deux();

}

function EstRempliCases() {
	for(let i=0;i<lignes;i++){
		for(let j=0;j<colonnes;j++){
			if(tab[i][j] == 0){
				return true;
			}			

		}
	}	
	return false;
	
}


function init_a_Deux(){

	if (!EstRempliCases()) {
		return;
	}
	let trouve = false;
	while (!trouve){
		//obtenir une valeur dans la case aleatoire

		let i = Math.floor(Math.random()*lignes); 
		let j = Math.floor(Math.random()*colonnes);

		if (tab[i][j] == 0) {
			tab[i][j] = 2;
			let cases = document.getElementById(i.toString() + "-" 
				+j.toString());
			cases.innerText = "2";
			cases.classList.add("n2");

			trouve = true;

		}
	}

}		 
		
function M_A_J_Case(cases,num) {

// innerText = toute modification est reflétée 
//immédiatement à l’écran
	cases.innerText =" ";
	//renvoie une chaîne avec les noms 
	//de classes présents dans l’attribut de l’élément
	cases.classList.value = "";
	cases.classList.add("cases");
	if (num > 0) {
		cases.innerText = num;
		if (num <= 1024) {
			cases.classList.add("n"+num.toString());
		}
		else{
			cases.classList.add("n2048");
		}
	} 


}

//fonction pour def les deplacements a l'aide des fleches	
// haut bas droite gauche qui sont sur le clavier
//keyup = relache d'une touche 
document.addEventListener("keyup",(e) => {
	if (e.code == "ArrowLeft") {
		deplacementGauche();
		init_a_Deux();
	}
	else if (e.code == "ArrowRight") {
		deplacementDroit();
		init_a_Deux();
	}
	else if (e.code == "ArrowUp") {
		deplacementHaut();
		init_a_Deux();
	}
	else if (e.code == "ArrowDown") {
		deplacementBas();
		init_a_Deux();
	}
	document.getElementById("score").innerText = score;
})

function filtreZero(lignes){
	return lignes.filter(num => num!= 0);
}

function deplacement(lignes){
	// ex : avant [0,2,2,2] 
	lignes = filtreZero(lignes);// apres [2,2,2]
	
	for(let i=0;i<lignes.length -1 ;i++){
		if(lignes[i]==lignes[i+1]){
			lignes[i]*=2;
			lignes[i+1]=0; // la case suiv est vider
			score += lignes[i]; // ajout au score
		} //ex : [2,2,2] -> [4,0,2]
	}

	lignes = filtreZero(lignes); //ex: [4,2]

	//2 cases vides restante donc ajout des 0

	while(lignes.length < colonnes){
		lignes.push(0);
	}//ex: [4,2,0,0]
	return lignes;
}

function deplacementGauche(){
	for(let i =0; i<lignes;i++){
		let lignes = tab[i];
		lignes = deplacement(lignes);
		tab[i] = lignes;

		for(let j=0;j<colonnes;j++){
			let cases = document.getElementById(i.toString() + "-" + j.toString());
			let num = tab[i][j];
			M_A_J_Case(cases,num);
		}
	}

}

function deplacementDroit(){
	for(let i =0; i<lignes;i++){
		let lignes = tab[i];
		lignes.reverse();
		lignes = deplacement(lignes);
		lignes.reverse();
		tab[i] = lignes;

		for(let j=0;j<colonnes;j++){
			let cases = document.getElementById(i.toString() + "-" + j.toString());
			let num = tab[i][j];
			M_A_J_Case(cases,num);
		}
	}

}

function deplacementHaut(){
	for(let j=0;j<colonnes;j++){
		let lignes= [tab[0][j] , tab[1][j] ,tab[2][j] ,tab[3][j]];
		lignes = deplacement(lignes);

		for(let i=0;i<lignes.length;i++){
			tab[i][j] = lignes[i];
				
			let cases = document.getElementById(i.toString() + "-" + j.toString());
			let num = tab[i][j];
			M_A_J_Case(cases,num);
		}
	}	

}	


function deplacementBas(){
	for(let j=0;j<colonnes;j++){
		let lignes= [tab[0][j] , tab[1][j] ,tab[2][j] ,tab[3][j]];
		lignes.reverse();
		lignes = deplacement(lignes);
		lignes.reverse();

		for(let i=0;i<lignes.length;i++){
			tab[i][j] = lignes[i];
				
			let cases = document.getElementById(i.toString() + "-" + j.toString());
			let num = tab[i][j];
			M_A_J_Case(cases,num);
		}
	}	
}