const typingHeader = document.getElementById('typing-header');
const text = 'Area Otaku ID';

function typeText(text, element) {
  let index = 0;
  let interval = setInterval(() => {
    element.textContent += text[index];
    index++;
    if (index >= text.length) {
      clearInterval(interval);
      setTimeout(() => {
        deleteText(element, text);
      }, 2000);
    }
  }, 100);
}

function deleteText(element, text) {
  let index = text.length - 1;
  let interval = setInterval(() => {
    element.textContent = text.substring(0, index);
    index--;
    if (index < 0) {
      clearInterval(interval);
      typeText(text, element);
    }
  }, 100);
}

typeText(text, typingHeader);

fetch('category.json')
 .then(response => response.json())
 .then(categories => {
    const categoryList = document.getElementById('category-list');
    const overlay = document.getElementById('overlay'); // Dapatkan elemen overlay

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

      // Tambahkan event listener untuk mengarahkan pengguna ke halaman yang sesuai
      categoryButton.addEventListener('click', () => {
          overlay.style.display = 'flex'; // Tampilkan overlay saat tombol diklik
          window.location.href = `/${category.id}.html`;
      });

      listItem.appendChild(categoryButton);
      categoryList.appendChild(listItem);
    });

    // Sembunyikan overlay setelah permintaan selesai
    document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
            overlay.style.display = 'none';
        }
    });
  })
 .catch(error => console.error('Error fetching or parsing JSON:', error));
