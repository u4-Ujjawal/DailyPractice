$(document).ready(function() {
    let cart = [];

    function renderCart() {
        const cartSummary = $("#cart-summary");
        cartSummary.empty();

        if (cart.length === 0) {
            cartSummary.html("<p>Your cart is empty.</p>");
            return;
        }

        let total = 0;
        const table = $('<table class="table table-striped"></table>');
        const thead = $(
            "<thead><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Subtotal</th><th>Action</th></tr></thead>"
        );
        const tbody = $("<tbody></tbody>");

        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const row = $(`
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>$${subtotal.toFixed(2)}</td>
          <td><button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button></td>
        </tr>
      `);
            tbody.append(row);
        });

        table.append(thead);
        table.append(tbody);
        cartSummary.append(table);
        cartSummary.append(`<h5>Total: $${total.toFixed(2)}</h5>`);
    }

    // Add to cart button click handler
    $("#add-to-cart").click(function() {
        const name = $("#product-name").text();
        const priceText = $("#product-price").text();
        const price = parseFloat(priceText.replace("$", ""));
        const quantity = parseInt($("#quantity").val());

        if (quantity < 1 || quantity > 10 || isNaN(quantity)) {
            alert("Please enter a valid quantity between 1 and 10.");
            return;
        }

        // Check if product already in cart
        const existingIndex = cart.findIndex((item) => item.name === name);
        if (existingIndex !== -1) {
            // Update quantity
            cart[existingIndex].quantity += quantity;
            if (cart[existingIndex].quantity > 10) {
                cart[existingIndex].quantity = 10; // max limit
                alert("Maximum quantity for this product is 10.");
            }
        } else {
            // Add new product to cart
            cart.push({ name, price, quantity });
        }

        renderCart();
    });

    // Remove item button click handler (event delegation)
    $("#cart-summary").on("click", ".remove-item", function() {
        const index = $(this).data("index");
        cart.splice(index, 1);
        renderCart();
    });

    // Initial render
    renderCart();
});