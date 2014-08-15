var CocosList = function() {
	this.constructor = function(options) {
		console.info(options);
	}

	this.constructor.apply(this, arguments);
}

window.addEventListener("load", function() {
	mtime = new Date().getTime(); // 

	var select = document.getElementById('cocoslist');
	select.className = select.className.trim() + "cocoslist__hide";

	var cocoslistElements = document.createElement('div');
    cocoslistElements.setAttribute('class', 'cocoslist-elements');
    cocoslistElements.addEventListener("click", function() {
		// console.info(cocoslistElements.className);
		if(cocoslistElements.className.indexOf('cocoslist-elements__active') > -1) {
			clases = cocoslistElements.className.replace("cocoslist-elements__active", "");
			cocoslistElements.className = clases.trim();
		} else {
			clases = cocoslistElements.className;
			cocoslistElements.className = clases.trim() + " cocoslist-elements__active";
		}
	});

	document.onclick = function( event ) {
		if(event.target.className.indexOf('cocoslist-element') == -1) {
			activeElements = document.getElementsByClassName('cocoslist-elements__active');
			console.info(activeElements);
			if(activeElements.length > 1) {
				each(activeElements, function(index, element) {
					clases = element.className.replace("cocoslist-elements__active", "");
					element.className = clases.trim();
				});
			} else {
				try {
					if(activeElements[0].hasAttribute("class")) {
						clases = activeElements[0].className.replace("cocoslist-elements__active", "");
						activeElements[0].className = clases.trim();
					}
				} catch(e) {}
			}
		}
	}

	select.parentNode.insertBefore(cocoslistElements, select.nextSibling);

	for (var prop in select.getElementsByTagName('option')) {
	    if( select.hasOwnProperty( prop ) ) {
	    	if(typeof select[prop].innerText != "undefined") {
	    		var list_item = document.createElement('div');
		      	list_item.setAttribute('class', 'cocoslist-element');
		      	list_item.innerText = select[prop].innerText;

				each(select[prop].attributes, function(index, attribute) {
					if(typeof attribute !== 'function' && typeof attribute !== 'number')
				    {
				    	list_item.setAttribute(attribute.name, attribute.value);
				    }
				}); 

				list_item.addEventListener("click", function(event) {
					if(this.hasAttribute("disabled") && cocoslistElements.className.indexOf('cocoslist-elements__active') > -1) {
						event.stopPropagation();
						return false;
					}
					if(cocoslistElements.className.indexOf('cocoslist-elements__active') > -1) {
						if(!cocoslistElements.getElementsByClassName('cocoslist-element')[0].hasAttribute("disabled")) {
							this.parentElement.removeChild(cocoslistElements.getElementsByClassName('cocoslist-element')[0]);
						}

						this.index = Array.prototype.slice.call( this.parentNode.children ).indexOf( this );
 
						select.getElementsByTagName('option')[select.querySelectorAll('[selected]')[0].index].removeAttribute('selected');
						select.getElementsByTagName('option')[this.index].setAttribute("selected", "");

						this.parentNode.insertBefore(this.cloneNode(true), cocoslistElements.getElementsByClassName('cocoslist-element')[0]);
					}
				});

		    	cocoslistElements.appendChild(list_item);
	    	}    	
	    } 
	}

	function each (elements, callback) {
		for (var element in elements) {
		    if( select.hasOwnProperty( prop ) ) {
		    	callback(element, elements[element]);
		    }
		}
	}

	String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, '');};

	end_mtime = (new Date().getTime() - mtime) / 1000;

	console.info('Выполняется за: ' + end_mtime + ' сек.');
	console.info('Среднее время: ' + parseFloat(localStorage.getItem("avg")) / parseInt(localStorage.getItem("count")) + ' сек.');
	localStorage.setItem("avg", parseFloat(localStorage.getItem("avg")) + end_mtime);
	localStorage.setItem("count", parseInt(localStorage.getItem("count")) + 1);
});