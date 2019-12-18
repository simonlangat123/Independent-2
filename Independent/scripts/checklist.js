(function (window) {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;

    // the CheckList object constructor
    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    // when the checkbox is clicked, get the email address from the row
    // and then call the function (func) that is passed in with the email as a parameter
    CheckList.prototype.addClickHandler = function (func) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    };

    // The method that adds a new row to the checklist
    CheckList.prototype.addRow = function (storeOrder) {
        // Remove any existing rows that match the email address
        this.removeRow(storeOrder.emailAddress);
        // Create a new instance of a row, using the coffee order info
        let rowElement = new Row(storeOrder);
        // Add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element
          .find('[value="' + email + '"]')
          .closest('[data-store-order="checkbox"]')
          .remove();
    };

    // Each row is one outstanding order
    function Row(storeOrder) {
      let $div = $('<div></div>', {
            'data-store-order': 'checkbox',
            'class': 'checkbox'
          });
      let $label = $('<label></label>');

      let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: storeOrder.emailAddress
          });
          console.log(storeOrder.size)

          let description = storeOrder + ' ';
          if (storeOrder.strength) {
      
      }
 
      description += ' (' + storeOrder.emailAddress + ')';
      description += ' [' + storeOrder.firstName + ']';
      description += ' [' + storeOrder.lastName + ']';
      description += ' [' + storeOrder.shoeSelect + ']';


      $label.append($checkbox);
      $label.append(description);
      $div.append($label);

      this.$element = $div;
    }

    // Add the Checklist to the App namespace
    App.CheckList = CheckList;
    window.App = App;
})(window);
