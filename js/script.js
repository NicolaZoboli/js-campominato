// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// chiedo all'utente di scegliere la difficoltà
var difficoltaSelezionata = 60;
var selezione = false;

while (selezione == false) {
  var difficolta = parseInt(prompt("Scegli la difficoltà : 0 (impossibile), 1 (altamente improbabile) o 2 (un filo meno improbabile)"));
  if (difficolta != 0 && difficolta != 1 && difficolta != 2) {
    selezione = false;
  } else if (difficolta == 0) {
    selezione = true;
    difficoltaSelezionata = 100;
  } else if (difficolta == 1) {
    selezione = true;
    difficoltaSelezionata = 80;
  } else if (difficolta == 2) {
    selezione = true;
    difficoltaSelezionata = 60;
  }
}

//creo l'array dei numeri generati dal computer
var arrayBombe = [];
var maxBombe = 16;

//creo l'array dei numeri generati dal utente
var arrayUtente = [];

// genero con la funzione getRandom 16 numeri
// stabilisco con la funzione inArray che siano tutti diversi l'uno dall'altro
// li inserisco nell'arrayBombe con push
while (arrayBombe.length < maxBombe) {

  var bomba = getRandom(1, difficoltaSelezionata);
  if (inArray(arrayBombe, bomba) != true) {
    arrayBombe.push(bomba);
  }
}

console.log("Array Bombe:", arrayBombe);

// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.

var arrayUtente = [];
var maxTentativi = difficoltaSelezionata - 16;
var punti = 0;
var i = 0;

//l'utente inserisce dei numeri fino al massimo consentito a fino a quando non inserisce una mina

var trovato = false;

while (arrayUtente.length < maxTentativi && trovato == false) {
  var numero = parseInt(prompt("Inserisci un numero da 1 a 100"));
  // se il numero è nel range allora controllo se è in bombe
  // se non è in bombe allora lo pusho nell'array
  if (isInRange(1, 100, numero) == true && inArray(arrayBombe, numero) == false && inArray(arrayUtente, numero) == false) {
    arrayUtente.push(numero);
    punti++;
  }

  // se il numero è già presente nell'arrayBombe stampo la scritta "Hai perso"
  if (inArray(arrayBombe, numero)) {
    console.log("Array Utente:", arrayUtente);
    console.log("Hai perso");
    trovato = true;
  }
}


// se l'utente riesce ad arrivare alla fine della partita senza incontrare nessuna bomba stampo la scritta "Hai vinto"
if (punti == maxTentativi) {
  console.log("Array Utente:", arrayUtente);
  console.log("Hai vinto");
}

console.log("Punti:", punti);

// functions

// genera un numero randomico da un minimo ad un massimo modificabili
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var result = Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
  return result;
}

// stabilisce se un elemento è un numero e se è compreso all'interno di un range modificabile
function isInRange(min, max, num) {
  if (num < min || num > max || isNaN(num)) {
    return false;
  }
  return true;
}

// stabilisce se un numero è già all'interno di un array
function inArray (array, elemento) {
  var i = 0;
  var trovato = false;
  while (i < array.length && trovato == false) {
    if (array[i] == elemento) {
      trovato = true;
    }
    i++;
  }
  return trovato;
}
