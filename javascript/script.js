



$('#tab-chi-siamo a').click(function(e){
	e.preventDefault();
	$(this).tab('show');
})

var search = function() {
	hideRoute();
	visualizer('hide', '#no-results');
	visualizer('hide', '#error');
	visualizer('hide', '#result-details');
	var data = $('#input-form').serializeArray();
	data[data.length] = {name: 'startLat', value: '42.422572'};
	data[data.length] = {name: 'startLng', value: '12.104944'};
	$.ajax('/search', {
		dataType: 'json',
		data: data,
		success: function(data) {
			if (data != null) {
				displayRoute(data);
				buildDetails(data);
				visualizer('show', '#result-details');
			} else {
				visualizer('show', '#no-results');
			}
		},
		error: function() {
			visualizer('show', '#error');
		},
		complete: function() {
			$('#search-btn').button('reset');
		},
	});
};

var buildDetails = function(points) {
	var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	var td = $('#table-details');
	var color
	td.empty();
	td.append('<tr>'+
			  '<td><div class="green marker">' + alphabet[0] + '</div></td>' +
			  '<td>Starting point</td>' +
			  '</tr>');
	for (var i = 1; i < points.length - 1; i++) {
		td.append('<tr>'+
				  '<td><div class="green marker">' + alphabet[i] + '</div></td>' +
				  '<td>' + buildProductString(points[i]) + '</td>' +
				  '</tr>');
	}
	td.append('<tr>'+
			  '<td><div class="red marker">' + alphabet[points.length-1] + '</div></td>' +
			  '<td>' + buildProductString(points[points.length-1]) + '</td>' +
			  '</tr>');
};

var buildProductString = function(point) {
	var product = $('#product-name').val();
	var productString = '<i>';
	productString += point.products[product].quantity;
	productString += ' ';
	productString += point.products[product].name;
	productString += '</i>';
	productString += ' on sale at this point ';
	productString += '(price: ';
	productString += point.products[product].price;
	productString += ' €)';
	return productString;
}

var visualizer = function(toggle, item_id) {
	var item = $(item_id);
	switch (toggle) {
		case 'show':
			item.show();
			break;
		case 'hide':
			item.hide();
			break;
	}
}