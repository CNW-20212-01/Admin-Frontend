import React, { useState } from 'react';

const API_ADD_BOOK_ENDPOINT = process.env.REACT_APP_API_ADD_BOOK_ENDPOINT;

const Add = ({ books, setBooks, setIsAdding }) => {
  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [price, setPrice] = useState(0);
  const [pages, setPages] = useState(0);
  const [publisher, setPublisher] = useState('');
  const [publishingYear, setPublishingYear] = useState(1999);
  const [purchased, setPurchased] = useState(0);
  const [intro, setIntro] = useState('');
  const [image, setImage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!bookName || !genre || !authorName || !publisher || !intro || !image) {
      alert('All fields are required!');
      return;
    }

    const book = {
      book_name: bookName,
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

    books.push(book);

    await fetch(API_ADD_BOOK_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("bearer_token")
      }
    })
    .then(res => alert(res.status))
    .catch(error => alert(error));

    setBooks(books);
    setIsAdding(false);

    alert(`Added book successfully!`);
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Book</h1>
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
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
