let index = 0;
index2 = 0;
singleItemSalesTax = 0;
salesTaxTotalAmount = 0;
totalAmount = 0;

const apply5PercentTax = (itemPrice) => {
  return parseFloat(itemPrice) * 0.05;
};

const apply10PercentTax = (itemPrice) => {
  return parseFloat(itemPrice) * 0.1;
};

const apply15PercentTax = (itemPrice) => {
  return parseFloat(itemPrice) * 0.15;
};

const roundSalesTax = (itemSalesTax) => {
  return (Math.ceil(itemSalesTax * 20) / 20).toFixed(2);
};

const itemPriceWithSalesTax = (preTaxItemPrice, itemSalesTax) => {
  return parseFloat(preTaxItemPrice) + parseFloat(itemSalesTax);
};

const totalAmountWithSalesTax = (preTaxTotalAmount, totalSalesTax) => {
  const itemsTotalAmountWithSalesTax =
    parseFloat(preTaxTotalAmount) + parseFloat(totalSalesTax);

  return itemsTotalAmountWithSalesTax.toFixed(2);
};

// Add new item row to basket table
$("#addItem").on("click", () => {
  index++;

  $("#basketTable > tbody").append(
    `<tr>
            <td>
                <input type="number" class="form-control" id="basketItemQuantity${index}" min="0" max="10">
            </td>
            <td>
                <input type="text" class="form-control" id="basketItemName${index}">
            </td>
            <td>
                <input type="number" class="form-control" id="basketItemPrice${index}" min="0" max="100">
            </td>
            <td>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="isBookFoodOrMedical${index}">
                    <label class="form-check-label" for="isBookFoodOrMedical">
                    Yes
                    </label>
                </div>
            </td>
            <td>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="isImported${index}">
                    <label class="form-check-label" for="isImported">
                    Yes
                    </label>
                </div>
            </td>
        </tr>`
  );
});

// Empty items from basket table
$("#emptyBasket").on("click", () => {
  $("#basketTable > tbody").empty();
  $("#receiptTable > tbody").empty();
  index = 0;
  index2 = 0;
  salesTaxTotalAmount = 0;
  totalAmount = 0;
  $("#salesTaxAmount").empty();
  $("#totalAmount").empty();
});

// Take input from basket and populate receipt
$("#printReceipt").on("click", () => {
  // basic form validation for empty input fields
  if ($(".form-control").val() == "" || $(".form-control").val() == " ") {
    alert("Please fill in all input fields.");
  } else {
    // Loop through basket table rows, check values and generate receipt
    $("#basketTable > tbody > tr").each(() => {
      index2++;

      // Append new table row to receipt table for every row in basket table
      $("#receiptTable > tbody").append(
        `<tr>
                <td id="receiptItemQuantity${index2}">
                </td>
                <td id="receiptItemName${index2}">
                </td>
                <td id="receiptItemPrice${index2}">
                </td>
            </tr>`
      );

      // Get values from basket table row inputs
      const basketItemQuantity = $("tr")
        .find(`#basketItemQuantity${index2}`)
        .val();
      const basketItemName = $("tr").find(`#basketItemName${index2}`).val();
      const basketItemPrice = parseFloat(
        $("tr").find(`#basketItemPrice${index2}`).val()
      );

      // Checkbox element variables
      const isBookFoodOrMedical = $("tr").find(`#isBookFoodOrMedical${index2}`);
      const isImported = $("tr").find(`#isImported${index2}`);

      // Populate receipt quantities and item names from basket inputs
      $(`#receiptItemQuantity${index2}`).html(basketItemQuantity);
      $(`#receiptItemName${index2}`).html(basketItemName);

      // Check if item is book, food, medical or imported
      if (
        // Item is book, food or medical and is not imported - no tax is applied
        isBookFoodOrMedical.prop("checked") == true &&
        isImported.prop("checked") == false
      ) {
        $(`#receiptItemPrice${index2}`).html(basketItemPrice);

        totalAmount += basketItemPrice;
        console.log(totalAmount);
      }

      // Item is book, food or medical and is imported - 5% tax is applied
      else if (
        isBookFoodOrMedical.prop("checked") == true &&
        isImported.prop("checked") == true
      ) {
        // Calculate sales tax
        singleItemSalesTax = apply5PercentTax(basketItemPrice);

        // Round tax to the nearest 0.05
        singleItemSalesTax = roundSalesTax(singleItemSalesTax);

        // Make sales tax a float
        singleItemSalesTax = parseFloat(singleItemSalesTax);

        // Calculate item price including sales tax
        const itemTotalPrice = itemPriceWithSalesTax(
          basketItemPrice,
          singleItemSalesTax
        );

        // Print item price on receipt
        $(`#receiptItemPrice${index2}`).html(itemTotalPrice);

        // Increment total sales tax
        salesTaxTotalAmount += singleItemSalesTax;

        // Increment total amount
        totalAmount += basketItemPrice;
      }

      // Item is not book, food, medical and is imported - 15% tax is applied
      else if (
        isBookFoodOrMedical.prop("checked") == false &&
        isImported.prop("checked") == true
      ) {
        // Calculate sales tax
        singleItemSalesTax = apply15PercentTax(basketItemPrice);

        // Round tax to the nearest 0.05
        singleItemSalesTax = roundSalesTax(singleItemSalesTax);

        // Make sales tax a float
        singleItemSalesTax = parseFloat(singleItemSalesTax);

        // Calculate item price including sales tax
        const itemTotalPrice = itemPriceWithSalesTax(
          basketItemPrice,
          singleItemSalesTax
        );

        // Print item price on receipt
        $(`#receiptItemPrice${index2}`).html(itemTotalPrice);

        // Increment total sales tax
        salesTaxTotalAmount += singleItemSalesTax;

        // Increment total amount
        totalAmount += basketItemPrice;
      }

      // Item is not book, food, medical and is not imported - 10% tax is applied
      else {
        // Calculate sales tax
        singleItemSalesTax = apply10PercentTax(basketItemPrice);

        // Round tax to the nearest 0.05
        singleItemSalesTax = roundSalesTax(singleItemSalesTax);

        // Make sales tax a float
        singleItemSalesTax = parseFloat(singleItemSalesTax);

        // Calculate item price including sales tax
        const itemTotalPrice = itemPriceWithSalesTax(
          basketItemPrice,
          singleItemSalesTax
        );

        // Print item price on receipt
        $(`#receiptItemPrice${index2}`).html(itemTotalPrice.toFixed(2));

        // Increment total sales tax
        salesTaxTotalAmount += singleItemSalesTax;

        // Increment total amount
        totalAmount += basketItemPrice;
      }
    });

    // Update sales tax and total amount values
    totalAmount = totalAmountWithSalesTax(totalAmount, salesTaxTotalAmount);

    $("#salesTaxAmount").html(salesTaxTotalAmount.toFixed(2));
    $("#totalAmount").html(totalAmount);
  }
});
