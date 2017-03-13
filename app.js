(function () {
  'use strict';
  // Defining the angular module
  angular.module('ShoppingListCheckOff', [])

  // Defining the angular controllers.
  .controller('ToBuyController', ToBuyController)
  .controller('BoughtController', BoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

   BoughtController.$inject = ['ShoppingListCheckOffService'];
   function BoughtController (ShoppingListCheckOffService) {
     var boughtCtrl = this;
     //boughtCtrl.boughtMessage = "Nothing is bought yet";
     boughtCtrl.boughtItems = ShoppingListCheckOffService.getBoughtList();
     boughtCtrl.boughtMessage = ShoppingListCheckOffService.getBoughtMsg();

   };

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

     function ToBuyController (ShoppingListCheckOffService) {
       var toBuyCtrl = this;
       toBuyCtrl.buyMessage = "";
       //toBuyCtrl.boughtMessage = "Nothing is bought yet";

       toBuyCtrl.toBuyItems = ShoppingListCheckOffService.getToBuyList();
       //toBuyCtrl.boughtItems = ShoppingListCheckOffService.getBoughtList();

       toBuyCtrl.doMove = function (index, itemName, itemQuantity) {
            ShoppingListCheckOffService.moveItemFromBuyToBought(index, itemName, itemQuantity);
            toBuyCtrl.toBuyItems = ShoppingListCheckOffService.getToBuyList();
            toBuyCtrl.buySize = toBuyCtrl.toBuyItems.length;


            if (toBuyCtrl.buySize  == 0) {
                toBuyCtrl.buyMessage = "Every thing is bought";
            };
        };
     }

     // Enriching the ShoppingListCheckOffService with functional content.
  function ShoppingListCheckOffService () {
    var service = this;
    var boughtMessage = {msg : 'Nothing is bought yet..'};

    // 'To buy' section - Start
    var buyList = [
      {itemName : 'Cookies', itemQuantity : '10 Bags'},
      {itemName : 'Cold Drinks', itemQuantity : '5 Bottles'},
      {itemName : 'Chips', itemQuantity : '3 Bags'},
      {itemName : 'Doughnuts', itemQuantity : '1 Pack'},
      {itemName : 'Cakes', itemQuantity : '3'}
    ];

    service.getToBuyList = function  () {
      return buyList;
    };

    service.removeItemFromBuyList = function  (index) {
      buyList.splice(index, 1);
    };
    //
    // // 'To buy' section - End
    //
    // 'Bought' section - Start
    var boughtList = [];
    service.addItemToBoughtList = function  (itemName, itemQuantity) {
      var item = {
        itemName : itemName, itemQuantity : itemQuantity
      };
      boughtList.push(item);
      boughtMessage.msg = "";
    };

    service.getBoughtList = function () {
      return boughtList;
    };

    service.getBoughtMsg = function() {
      return boughtMessage;
    }
    // 'Bought' section - End

    // common section - Start
    service.moveItemFromBuyToBought = function (index, itemName, itemQuantity) {

      service.removeItemFromBuyList(index);
      service.addItemToBoughtList(itemName, itemQuantity);
    };
    // common section - End


  }



})();
