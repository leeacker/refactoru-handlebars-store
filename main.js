
var wishlistItems = [];

$(document).on('ready', function() {
  
	var templateContent = $('#store-item-template').html();
	var storeItemFunction = Handlebars.compile(templateContent);
	var itemsOutput = storeItemFunction(productsData);

	$('#product-container').append(itemsOutput);

	var wishlistTemplateContent = $('#wishlist-item-template').html();
	var wishlistItemFunction = Handlebars.compile(wishlistTemplateContent);

	var wishlistWarningContent = $('#wishlist-warning-template').html();
	var wishlistWarningFunction = Handlebars.compile(wishlistWarningContent);

	$('#wishlist-add-button').on('click', function(e){
		e.preventDefault();
		if($('#wishlist-warning')){
			$('#wishlist-warning').remove();
		}
		var newItem = $('#wishlist-add-input').val().trim();
		var newObject = {
				title: newItem
			};

		if(wishlistItems.indexOf(newItem) === -1){
			
			$('#wishlist-add-input').val('');
			
			var newTemplateItem = wishlistItemFunction(newObject);
			$('#wishlist-ul').append(newTemplateItem);
			wishlistItems.push(newItem);	
		} else {
			var newTemplateItem = wishlistWarningFunction(newObject);
			$('#wishlist-ul').append(newTemplateItem);
		}
		$('#dismiss-wishlist').trigger('click');

	});
	$(document).on('click', '#remove-wishlist-item', function(e){
		e.preventDefault();
		if($('#wishlist-warning')){
			$('#wishlist-warning').remove();
		}
		var itemName = $(this).closest('p').text().trim();
		
		$(this).closest('li').remove();
		
		var currentIndex = wishlistItems.indexOf(itemName);
		
		wishlistItems.splice(currentIndex, 1);
	});
	$(document).on('click', '#add-to-wishlist', function(e){
		e.preventDefault();
		if($('#wishlist-warning')){
			$('#wishlist-warning').remove();
		}
		var itemTitle = $(this).siblings('h2').html().trim();
		var newObject = {
				title: itemTitle
			};

		if(wishlistItems.indexOf(itemTitle) === -1){
			
			var newTemplateItem = wishlistItemFunction(newObject);
			$('#wishlist-ul').append(newTemplateItem);
			wishlistItems.push(itemTitle);
		} else {
			var newTemplateItem = wishlistWarningFunction(newObject);
			$('#wishlist-ul').append(newTemplateItem);
		}
	});
});