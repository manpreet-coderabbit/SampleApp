document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');
    const productList = document.getElementById('productList');
    const addProductForm = document.getElementById('addProductForm');

    // Fetch and display users
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email})`;
                userList.appendChild(li);
            });
        });

    // Fetch and display products
    function fetchProducts() {
        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                productList.innerHTML = '';
                products.forEach(product => {
                    const li = document.createElement('li');
                    li.textContent = `${product.name} - $${product.price}`;
                    productList.appendChild(li);
                });
            });
    }

    fetchProducts();

    // Add new product
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;

        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price: parseFloat(price) }),
        })
        .then(response => response.json())
        .then(() => {
            fetchProducts();
            addProductForm.reset();
        });
    });
});