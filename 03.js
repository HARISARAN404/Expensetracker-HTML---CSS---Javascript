document.addEventListener("DOMContentLoaded", function() {
    var totalAmount = 0;

    document.querySelector(".add_exp").addEventListener("click", function() {
        var product = document.querySelector(".product").value;
        var price = parseFloat(document.querySelector(".price").value);
        var category = document.querySelector(".dropdown").value;
        var date = document.querySelector(".date").value;

        if (product && !isNaN(price) && category && date) {
            var row = document.createElement("tr");
            row.setAttribute("data-category", category);
            row.innerHTML = `<td>${product}</td>
                             <td>${price.toFixed(2)}</td>
                             <td>${category}</td>
                             <td>${date}</td>
                             <td>
                                 <span class="edit action-btn">Edit</span>
                                 <span class="delete action-btn">Delete</span>
                             </td>`;
            document.querySelector("#expenseTable tbody").appendChild(row);

            totalAmount += price;
            updateTotalDisplay(totalAmount);

            // Clear the input fields after adding the expense
            document.querySelector(".product").value = '';
            document.querySelector(".price").value = '';
            document.querySelector(".dropdown").value = '';
            document.querySelector(".date").value = '';
        } else {
            alert("Please fill out all the fields");
        }
    });

    document.querySelector("#expenseTable").addEventListener("click", function(event) {
        if (event.target.classList.contains("delete")) {
            var row = event.target.closest("tr");
            var price = parseFloat(row.cells[1].textContent);

            // Update total
            totalAmount -= price;
            updateTotalDisplay(totalAmount);

            row.remove();
        }

        if (event.target.classList.contains("edit")) {
            var row = event.target.closest("tr");
            var product = row.cells[0].textContent;
            var price = parseFloat(row.cells[1].textContent);
            var category = row.cells[2].textContent;
            var date = row.cells[3].textContent;

            document.querySelector(".product").value = product;
            document.querySelector(".price").value = price;
            document.querySelector(".dropdown").value = category;
            document.querySelector(".date").value = date;

            totalAmount -= price;
            updateTotalDisplay(totalAmount);

            row.remove();
        }
    });

    document.querySelector("#filterCategory").addEventListener("change", function() {
        var selectedCategory = this.value;
        var filteredTotal = 0;

        var rows = document.querySelectorAll("#expenseTable tbody tr");
        rows.forEach(function(row) {
            if (selectedCategory === "" || row.getAttribute("data-category") === selectedCategory) {
                row.style.display = "";
                filteredTotal += parseFloat(row.cells[1].textContent);
            } else {
                row.style.display = "none";
            }
        });

        updateTotalDisplay(filteredTotal);
    });

    function updateTotalDisplay(amount) {
        document.querySelector("#totalamount").textContent = amount.toFixed(2);
    }
});
