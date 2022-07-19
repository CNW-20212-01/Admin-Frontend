import React, { useState } from 'react';

const API_EDIT_BOOK_ENDPOINT = process.env.REACT_APP_API_EDIT_BOOK_ENDPOINT;

const Edit = ({ books, selectedBook, setBooks, setIsEditing }) => {
  const id = selectedBook.book_id;

  const [bookName, setBookName] = useState(selectedBook.Book_name);
  const [genre, setGenre] = useState(selectedBook.genre);
  const [authorName, setAuthorName] = useState(selectedBook.author_name);
  const [price, setPrice] = useState(selectedBook.price);
  const [pages, setPages] = useState(selectedBook.pages);
  const [publisher, setPublisher] = useState(selectedBook.publisher);
  const [publishingYear, setPublishingYear] = useState(selectedBook.publishing_year);
  const [purchased, setPurchased] = useState(selectedBook.purchased);
  const [intro, setIntro] = useState(selectedBook.intro);
  const [image, setImage] = useState(selectedBook.image);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!bookName || !genre || !authorName || !publisher || !intro || !image) {
      alert('All fields are required!');
      return;
    }

    const book = {
      book_id: id,
      Book_name: bookName,
      genre: genre,
      author_name: authorName,
      price: price,
      pages: pages,
      publisher: publisher,
      publishing_year: publishingYear,
      purchased: purchased,
      intro: intro,
      image: image
    };

    for (let i = 0; i < books.length; i++) {
      if (books[i].book_id === id) {
        books.splice(i, 1, book);
        break;
      }
    }

    await fetch(API_EDIT_BOOK_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("bearer_token")
      }
    })
    .catch(error => alert(error));

    setBooks(books);
    setIsEditing(false);

    alert(`Updated book successfully!`);
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Book</h1>
        <label htmlFor="bookName">Book Name</label>
        <input
          id="bookName"
          type="text"
          name="bookName"
          value={bookName}
          onChange={e => setBookName(e.target.value)}
        />
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          type="text"
          name="genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
        <label htmlFor="authorName">Author</label>
        <input
          id="authorName"
          type="text"
          name="authorName"
          value={authorName}
          onChange={e => setAuthorName(e.target.value)}
        />
        <label htmlFor="price">Price ($)</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <label htmlFor="pages">Pages</label>
        <input
          id="pages"
          type="number"
          name="pages"
          value={pages}
          onChange={e => setPages(e.target.value)}
        />
        <label htmlFor="publisher">Publisher</label>
        <input
          id="publisher"
          type="text"
          name="publisher"
          value={publisher}
          onChange={e => setPublisher(e.target.value)}
        />
        <label htmlFor="publishingYear">Published Year</label>
        <input
          id="publishingYear"
          type="number"
          name="publishingYear"
          value={publishingYear}
          onChange={e => setPublishingYear(e.target.value)} 
        />
        <label htmlFor="purchased">Purchased</label>
        <input
          id="purchased"
          type="number"
          name="purchased"
          value={purchased}
          onChange={e => setPurchased(e.target.value)} 
        />
        <label htmlFor="intro">Intro</label>
        <input
          id="intro"
          type="text"
          name="intro"
          value={intro}
          onChange={e => setIntro(e.target.value)} 
        />
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          name="image"
          value={image}
          onChange={e => setImage(e.target.value)} 
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
