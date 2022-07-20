import React, { useState, useEffect } from 'react';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

//import { booksData } from '../../data';

const API_BOOKS_ENDPOINT = process.env.REACT_APP_API_BOOKS_ENDPOINT;
const API_DELETE_BOOK_ENDPOINT = process.env.REACT_APP_API_DELETE_BOOK_ENDPOINT;

const Dashboard = ({ setIsAuthenticated }) => {
  //const [books, setBooks] = useState(booksData);
  const [books, setBooks] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTableData = async () => {
    await fetch(API_BOOKS_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("bearer_token")
      }
    })
    .then(res => res.json())
    .then(data => {
      setBooks(data.map(item => ({
        book_id: item.book_id,
        book_name: item.Book_name,
        genre: item.genre,
        author_name: item.author_name,
        price: item.price,
        pages: item.pages,
        publisher: item.publisher,
        publishing_year: item.publishing_year,
        purchased: item.purchased,
        intro: item.intro,
        image: item.image
      })));
      setIsLoading(false);
    })
    .catch(error => alert(error));
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleEdit = id => {
    const [book] = books.filter(book => book.book_id === id);

    setSelectedBook(book);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await fetch(API_DELETE_BOOK_ENDPOINT, {
      method: "DELETE",
      body: JSON.stringify({
        book_id: id
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("bearer_token")
      }
    })
    .catch(error => alert(error));

    const booksCopy = books.filter(book => book.book_id !== id);
    localStorage.setItem('books_data', JSON.stringify(booksCopy));
    
    setBooks(booksCopy);

    alert('Deleted book successfully!');
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && !isLoading && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            books={books}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && !isLoading && (
        <Add
          books={books}
          setBooks={setBooks}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && !isLoading && (
        <Edit
          books={books}
          selectedBook={selectedBook}
          setBooks={setBooks}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
