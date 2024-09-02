document.addEventListener("DOMContentLoaded", function () {
    // Get modal elements
    const modal = document.getElementById("cardModal");
    const confirmModal = document.getElementById("confirmModal");
    const btn = document.getElementById("addCardBtn");
    const span = document.getElementsByClassName("close")[0];
    const cancelDelete = document.getElementById("cancelDelete");
    const confirmDelete = document.getElementById("confirmDelete");

    let currentCardIdToDelete;

    // Handle modal open and close
    btn.onclick = function () {
        modal.style.display = "block";
    };
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Handle form input toggle between text and image
    const cardFrontType = document.getElementById("cardFrontType");
    const frontInput = document.getElementById("frontInput");
    const imageInput = document.getElementById("imageInput");

    cardFrontType.addEventListener("change", function () {
        if (this.value === "image") {
            frontInput.style.display = "none";
            imageInput.style.display = "block";
        } else {
            frontInput.style.display = "block";
            imageInput.style.display = "none";
        }
    });

    // Handle form submission
    const form = document.getElementById("cardForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const frontType = cardFrontType.value;
        const backText = document.getElementById("cardBack").value;

        if (frontType === "text") {
            const frontText = document.getElementById("cardFrontText").value;
            saveTextCard(frontText, backText);
        } else {
            const file = document.getElementById("cardFrontImage").files[0];
            if (file) {
                saveImageCard(file, backText);
            }
        }

        form.reset();
        modal.style.display = "none";
    });

    // Save text-based flashcard
    function saveTextCard(frontText, backText) {
        const flashcards = getFlashcards();
        const newCard = { id: flashcards.length, front: frontText, back: backText, type: 'text' };
        flashcards.push(newCard);
        saveFlashcards(flashcards);
        createFlashcardElement(newCard);
    }

    // Save image-based flashcard
    function saveImageCard(file, backText) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const flashcards = getFlashcards();
            const newCard = { id: flashcards.length, front: reader.result, back: backText, type: 'image' };
            flashcards.push(newCard);
            saveFlashcards(flashcards);
            createFlashcardElement(newCard);
        };
        reader.readAsDataURL(file);
    }

    // Create flashcard element in the DOM
    function createFlashcardElement(card) {
        const container = document.getElementById('flashcardContainer');

        const flashcard = document.createElement('div');
        flashcard.className = 'flashcard';
        flashcard.setAttribute('onclick', 'flipCard(this)');

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = function (event) {
            event.stopPropagation();
            showConfirmModal(card.id);
        };

        const front = document.createElement('div');
        front.className = 'front';

        if (card.type === 'image') {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'image-wrapper';
            const img = document.createElement('img');
            img.src = card.front;
            imgWrapper.appendChild(img);
            front.appendChild(imgWrapper);
        } else {
            front.textContent = card.front;
        }

        const back = document.createElement('div');
        back.className = 'back';
        back.textContent = card.back;

        flashcard.appendChild(deleteBtn);
        flashcard.appendChild(front);
        flashcard.appendChild(back);
        container.appendChild(flashcard);
    }

    // Show confirmation modal
    function showConfirmModal(cardId) {
        currentCardIdToDelete = cardId;
        confirmModal.style.display = 'block';
    }

    // Handle confirm and cancel delete
    confirmDelete.onclick = function () {
        deleteFlashcard(currentCardIdToDelete);
        confirmModal.style.display = 'none';
    };

    cancelDelete.onclick = function () {
        confirmModal.style.display = 'none';
    };

    // Delete flashcard
    function deleteFlashcard(cardId) {
        let flashcards = getFlashcards();
        flashcards = flashcards.filter(card => card.id !== cardId);
        saveFlashcards(flashcards);
        reloadFlashcards(); // Reload flashcards
    }

    // Get flashcards from localStorage
    function getFlashcards() {
        const flashcards = localStorage.getItem('flashcards');
        return flashcards ? JSON.parse(flashcards) : [];
    }

    // Save flashcards to localStorage
    function saveFlashcards(flashcards) {
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

    // Reload flashcards
    function reloadFlashcards() {
        const container = document.getElementById('flashcardContainer');
        container.innerHTML = `
            <div>
              <h1>Advance FlashCard</h1>
              <p>Petunjuk: Tekan card untuk membalikkan posisinya</p>
              <hr>
              <button id="addCardBtn">+ Card</button>
            </div>
        `;
        loadFlashcards();
    }

    // Load existing flashcards on page load
    function loadFlashcards() {
        const flashcards = getFlashcards();
        flashcards.forEach(createFlashcardElement);

        // Re-add event listener to "+" button
        const addCardBtn = document.getElementById("addCardBtn");
        addCardBtn.onclick = function () {
            modal.style.display = "block";
        };
    }

    loadFlashcards();
});

function flipCard(card) {
    card.classList.toggle('flipped');
}
