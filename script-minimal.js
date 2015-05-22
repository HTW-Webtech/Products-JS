document.getElementById('submit').addEventListener('click', function(e) {
   e.preventDefault();
   document.getElementById('products').innerHTML +=
      '<div class="item col-xs-4"><div class="thumbnail">' +
         '<a href="' + document.getElementById('url').value + '"><img src="' + document.getElementById('image').value + '" alt="Produktbild"></a>' +
         '<div class="caption">' +
            '<h4><a href="' + document.getElementById('url').value + '">' + document.getElementById('name').value + '</a></h4>' +
            '<span class="lead">' + document.getElementById('price').value + '€</span>' +
      '</div></div></div>';
});