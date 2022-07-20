import React, { useState, useEffect } from 'react';

import Header from './Header';
import BooksTable from './BooksTable';
import BillsTable from './BillsTable';
import Add from './Add';
import Edit from './Edit';

//import { booksData } from '../../data';

const API_BOOKS_ENDPOINT = process.env.REACT_APP_API_BOOKS_ENDPOINT;
const API_BILLS_ENDPOINT = process.env.REACT_APP_API_BILLS_ENDPOINT;
const API_DELETE_BOOK_ENDPOINT = process.env.REACT_APP_API_DELETE_BOOK_ENDPOINT;

const Dashboard = ({ setIsAuthenticated }) => {
  //const [books, setBooks] = useState(booksData);
  const [books, setBooks] = useState([]);
  const [bills, setBills] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isBooksLoading, setIsBooksLoading] = useState(true);
  const [isBillsLoading, setIsBillsLoading] = useState(true);

  const fetchBooksTableData = async () => {
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

      setIsBooksLoading(false);
    })
    .catch(error => alert(error));
  }

  const fetchBillsTableData = async () => {
    await fetch(API_BILLS_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("bearer_token")
      }
    })
    .then(res => res.json())
    .then(data => {
      setBills(data.map(item => ({
        bill_id: item.bill_id,
        date_bill: item.date_bill,
        phone_number: item.phone_number,
        name: item.name,
        total_money: item.total_money,
        address: item.address
      })));

      setIsBillsLoading(false);
    })
    .catch(error => alert(error));
  }

  useEffect(() => {
    fetchBooksTableData();
    fetchBillsTableData();
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
      {!isAdding && !isEditing && (
        <>
          <Header setIsAuthenticated={setIsAuthenticated} />
          <h2>I. Table Of Books:</h2>
          <div style={{ marginTop: '30px', marginBottom: '18px' }}>
            <button onClick={() => setIsAdding(true)}>Add New Book</button>
          </div>
          {!isBooksLoading && <BooksTable
            books={books}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />}
          <hr style={{marginTop: 30}}></hr>
          <h2>II. Table Of Bills:</h2>
          {!isBillsLoading && <BillsTable
            bills={bills}
          />}
        </>
      )}
      {isAdding && !isBooksLoading && (
        <Add
          books={books}
          setBooks={setBooks}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && !isBooksLoading && (
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
