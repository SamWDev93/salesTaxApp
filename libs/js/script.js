let index = 0;

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
  index = 0;
});

// Take input from basket and populate receipt
$("#printReceipt").on("click", () => {
  // basic form validation for empty input fields
  if ($(".form-control").val() == "" || $(".form-control").val() == " ") {
    alert("Please fill in all input fields.");
  }
});
