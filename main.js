// Getting the value of the searh input
var searchInput = document.querySelector('#search input[type="search"]');
//getting the inputs of the header forms
var titleInput = document.querySelector('#title');
var descriptionInput = document.querySelector('#desc');

var information = document.forms['info'];
information.addEventListener('submit', (el) => {
    el.preventDefault();

    //checking if the input is empty
    if (!titleInput.value || !descriptionInput.value) {
        alert('Please fill in the form.');
        return false;
    }


    var bookmark = {
        title: titleInput.value,
        description: descriptionInput.value
    }



    // local storage---

    if (localStorage.getItem('bookmarks') === null) {
        //init array
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
        //get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //re-set back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks();


});


function fetchBookmarks() {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarkResults = document.querySelector('ul');

    bookmarkResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var title = bookmarks[i].title;
        var description = bookmarks[i].description;

        bookmarkResults.innerHTML +=
            ' <article>' +
            '<li>' +
            '<h2>' + title + '</h2>' +
            '<img src="icons/icons8_Trash_20px.png" class="delete" alt="">' +
            '</li>' +
            '<blockquote>' + description + '</blockquote>' +
            '</article>';

    }
}
searching();
var btn = document.querySelector('ul');

function searching() {

    fetchBookmarks();
    const searchBar = document.forms['search'].querySelector('input');

    searchBar.addEventListener('keyup', function(e) {
        const term = e.target.value.toLowerCase();
        const keywords = btn.getElementsByTagName('article');
        Array.from(keywords).forEach(function(book) {
            const title = book.firstElementChild.textContent;
            if (title.toLowerCase().indexOf(term) != -1) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    });
}

//deleting the object

var list = document.querySelector('#userInput ul');

function deleting() {
    list.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.className == 'delete') {
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            for (let i = 0; i < bookmarks.length; i++) {
                if (bookmarks[i].title) {
                    bookmarks.splice(i, 1);
                }
            }
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

            var lip = e.target.parentElement.parentElement;
            list.removeChild(lip);
        }
    });
}
deleting();