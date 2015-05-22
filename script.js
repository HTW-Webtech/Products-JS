/**
 * Ermöglicht es, aus den aktuellen Werten im Formular im Frontend
 * ein neues Produkt anzulegen.
 */

/**
 * Der Button des Formulars
 * @type {Node}
 */
var button = document.getElementById('submit');
/**
 * Das HTML-Element, in dass die Produkte eingefügt werden sollen.
 * @type {Node}
 */
var products = document.getElementById('products');
/**
 * Das HTML-Template eines Produkts.
 * Wird als Wert eines unsichtbaren Textfeldes eingelesen.
 * @type {String}
 */
var template = document.getElementById('template').value;

/*
   Bindet einen Eventlistener für Click-Events an den Button, der bei jedem
   Drücken des Buttons eine (in diesem Fall anonyme) Funktion ausführt.
 */
button.addEventListener('click', function(e) {
   /*
      Verhindert die Default-Aktion des Buttons – also das Absenden des Formulars.
      Dadurch behalten wir die normale Funktionalität des Formulars bei und sorgen dafür,
      dass JavaScript nur eine Verbesserung, aber keine Bedingung ist.
      Siehe: http://de.wikipedia.org/wiki/Unobtrusive_JavaScript
    */
   e.preventDefault();

   /*
      Führt die Funktion `addProduct` aus und übergibt die
      aktuell im Formular vorhandenen Daten.
    */
   addProduct({
      url: document.getElementById('url').value,
      image: document.getElementById('image').value,
      name: document.getElementById('name').value,
      price: document.getElementById('price').value
   });
});

/**
 * Fügt ein neues Produkt in die Seite ein.
 * @param {Object} values Objekt mir allen Werten eines Produkts.
 */
var addProduct = function(values) {

   /* Kopie des Templates */
   var output = template;

   /* … dessen Platzhalter schrittweise durch die Werte aus `values` ersetzt werden */
   for (var key in values) {
      if (values.hasOwnProperty(key)) {
         var pattern = new RegExp('{{' + key + '}}', 'gi');
         output = output.replace(pattern, values[key]);
      }
   }

   /*
      Danach wird das aktuell im Produkte-Element vorhandene HTML
      um das HTML des neuen Produkts erweitert.
    */
   products.innerHTML += output;

};
