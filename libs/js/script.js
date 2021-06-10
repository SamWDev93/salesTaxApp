let index = 0;
index2 = 0;
salesTax = 0;
totalAmount = 0;

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
  salesTax = 0;
  totalAmount = 0;
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
        isBookFoodOrMedical.prop("checked") == true &&
        isImported.prop("checked") == false
      ) {
        // No tax is applied
        $(`#receiptItemPrice${index2}`).html(basketItemPrice);

        totalAmount += basketItemPrice;
        console.log(totalAmount);
      }
    });

    // Update sales tax and total amount values
    $("#salesTaxAmount").html(salesTax);
    $("#totalAmount").html(totalAmount);
  }
});
