var CocosList = function() {
    this.constructor = function(options) {
        this.options = options;

        this.render();
    }

    this.render = function() {
        var select = this.options.element;
        select.classList.add('cocoslist__hide');

        var cocoslistElements = document.createElement('div');
        cocoslistElements.classList.add('cocoslist-elements');
        
        cocoslistElements.addEventListener("click", function() {
            if(cocoslistElements.classList.contains('cocoslist-elements__active')) {
                cocoslistElements.classList.remove("cocoslist-elements__active");
            } else {
                cocoslistElements.classList.add('cocoslist-elements__active');
            }
        });

        document.addEventListener('click', function(event) {
            if(!event.target.classList.contains('cocoslist-element')) {
                activeElements = document.getElementsByClassName('cocoslist-elements__active');

                if(activeElements.length > 1) {
                    [].forEach.call(activeElements, function(index, element) {
                        element.classList.remove("cocoslist-elements__active");
                    });
                } else {
                    try {
                        if(activeElements[0].hasAttribute("class")) {
                            activeElements[0].classList.remove("cocoslist-elements__active");
                        }
                    } catch(e) {}
                }
            }
        });

        select.parentNode.insertBefore(cocoslistElements, select.nextSibling);

        [].forEach.call(select.getElementsByTagName('option'), function(option, index) {
            if(typeof option.innerText != "undefined") {
                var list_item = document.createElement('div');
                list_item.setAttribute('class', 'cocoslist-element');
                list_item.innerText = option.innerText;

                [].forEach.call(option.attributes, function(attribute, index) {
                    if(typeof attribute !== 'function' && typeof attribute !== 'number') {
                        list_item.setAttribute(attribute.name, attribute.value);
                    }
                });

                list_item.addEventListener("click", function(event) {
                    if(this.hasAttribute("disabled") && cocoslistElements.classList.contains('cocoslist-elements__active')) {
                        event.stopPropagation();
                        return false;
                    }

                    if(cocoslistElements.classList.contains('cocoslist-elements__active')) {
                        if(!cocoslistElements.querySelector('.cocoslist-element').hasAttribute("disabled")) {
                            this.parentElement.removeChild(cocoslistElements.querySelector('.cocoslist-element'));
                        }

                        this.index = Array.prototype.slice.call( this.parentNode.children ).indexOf( this );
                        
                        var optionContainer     = select.querySelectorAll('option'),
                            optionSelectedIndex = select.querySelector('[selected]').index;

                        optionContainer[optionSelectedIndex].removeAttribute('selected');
                        optionContainer[this.index].setAttribute("selected", true);

                        this.parentNode.insertBefore(this.cloneNode(true), cocoslistElements.querySelector('.cocoslist-element'));
                    }
                });

                cocoslistElements.appendChild(list_item);
            }
        });
    }

    this.constructor.apply(this, arguments);
}