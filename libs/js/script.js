let index = 0;

// Add new item row to basket table
$("#addItem").on("click", () => {
  index++;

  $("#basketTable > tbody").append(
    `<tr>
            <td>
                <input type="number" class="form-control" id="basketItemQuantity${index}">
            </td>
            <td>
                <input type="text" class="form-control" id="basketItemName${index}">
            </td>
            <td>
                <input type="number" class="form-control" id="basketItemPrice${index}">
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
