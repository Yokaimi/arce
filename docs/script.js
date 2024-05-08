fetch('category.json')
   .then(response => response.json())
   .then(categories => {
        const categoryList = document.getElementById('category-list');

        categories.forEach(category => {
            const listItem = document.createElement('li');
            const categoryButton = document.createElement('button');
            
            const categoryNameSpan = document.createElement('div');
            
            categoryNameSpan.textContent = category.name;
            categoryButton.appendChild(categoryNameSpan);
            categoryButton.classList.add('slide', 'fade-in-bottom');

            // Tambahkan ikon panah ke kanan ke dalam tombol
            const arrowIcon = document.createElement('i');
            arrowIcon.classList.add('icon-arrow-right');
            categoryButton.appendChild(arrowIcon);

            categoryButton.classList.add('slide');
            listItem.appendChild(categoryButton);
            categoryList.appendChild(listItem);
            
        });
    })
   .catch(error => console.error('Error fetching or parsing JSON:', error));
