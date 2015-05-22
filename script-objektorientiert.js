/**
 * Ermöglicht es, aus den aktuellen Werten im Formular im Frontend
 * ein neues Produkt anzulegen.
 */

/**
 * Repräsentiert eine Produkt-Liste.
 * @param {Node}   form      Element des Formulars
 * @param {Node}   container Element der zukünftigen Produkte
 * @param {String} template  HTML-Template eines Produkts
 */
function Productlist(form, container, template) {
   this.form = form;
   this.container = container;
   this.template = template;
   this.products = [];
   this.init();
}

/**
 * Initialisiert eine Produktliste
 */
Productlist.prototype.init = function() {

   /* Referenz auf sich selber, um auch in einem anderem Kontext darauf zugreifen zu können. */
   var that = this;

   /* Button des Formulars */
   var button = this.form.querySelector('button');

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
      /* Führt auf dem Productlist-Objekt die Funktion `add` aus. */
      that.add();
      /* Führt auf dem Productlist-Objekt die Funktion `render` aus. */
      that.render();
   });

};

/**
 * Zeigt alle derzeit vorhandenen Produkte in der Seite an.
 */
Productlist.prototype.render = function() {

   /* HTML, das später das aktuelle HTML der Produktliste ersetzt. */
   var output = '';
   /* Helfer-Variablen, die hier nur definiert werden. */
   var i, product, template, key, pattern;

   /*
      Iteriert über alle Produkte, ersetzt dabei jeweils in einer Kopie
      des Templates die Platzhalter durch die konkreten Werte des Produkts
      und fügt das fertige HTML der Output-Variable hinzu.
    */
   for (i = 0; i < this.products.length; i++) {
      product = this.products[i];
      template = this.template;

      for (key in product) {
         if (product.hasOwnProperty(key)) {
            pattern = new RegExp('{{' + key + '}}', 'gi');
            template = template.replace(pattern, product[key]);
         }
      }
      output += template;
   }

   /* Überschreibt das HTML der alten Produktliste durch das der neuen. */
   this.container.innerHTML = output;

};

/**
 * Fügt der Produktliste (`products`) ein neues Produkt anhand
 * der aktuellen Formular-Felder hinzu.
 */
Productlist.prototype.add = function() {

   /* Liste aller Input-Elemente im Formular */
   var inputs = this.form.querySelectorAll('input');

   /* Das neue Produkt */
   var product = {};

   /*
      Legt im Produkt-Objekt für den Namen jedes Input-Elements einen
      neuen Schlüssel mit diesem Namen an und setzt seinen Wert auf den
      Wert im Input-Element.
   */
   for (var i = 0; i < inputs.length; i++) {
      product[inputs[i].name] = inputs[i].value;
      /* Leert das Input-Element */
      // inputs[i].value = '';
   }

   /* Hängt das neue Produkt der Produktliste an. */
   this.products.push(product);

};
