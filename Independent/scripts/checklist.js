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
    // and then call the function (func) that is passed in with the email
    CheckList.prototype.addClickHandler = function (func) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    };

    // adds a row to the checklist
    CheckList.prototype.addRow = function (storeOrder) {
        // Remove rows that match the email 
        this.removeRow(storeOrder.emailAddress);
        // Create a new instance of a row
        let rowElement = new Row(storeOrder);
        // Add the new row instance's $element property
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element
          .find('[value="' + email + '"]')
          .closest('[data-store-order="checkbox"]')
          .remove();
    };

    // Each row is a order
    function Row(storeOrder) {
      let $div = $('<div></div>', {
           
          });
      let $label = $('<label></label>');

      let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: storeOrder.emailAddress
          });

          let description = ' ';
          if (storeOrder) {
      
      }
 
      description += ' (' + storeOrder.emailAddress + ')';
      description += ' [' + storeOrder.firstName + ']';
      description += ' [' + storeOrder.lastName + ']';
      description += ' [' + storeOrder.shoeSelect + ']';
      description += ' [' + storeOrder.phoneNumber + ']';


      

      $label.append($checkbox);
      $label.append(description);
      $div.append($label);

      this.$element = $div;
    }

    // Add the Checklist to the App namespace
    App.CheckList = CheckList;
    window.App = App;
})(window);