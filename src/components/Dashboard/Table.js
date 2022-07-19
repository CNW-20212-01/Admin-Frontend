import React from 'react';

const Table = ({ books, handleEdit, handleDelete }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Author</th>
            <th>Price</th>
            <th>Pages</th>
            <th>Publisher</th>
            <th>Published Year</th>
            <th>Purchased</th>
            <th>Intro</th>
            <th>Image URL</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, i) => (
              <tr key={book.book_id}>
                <td>{i + 1}</td>
                <td>{book.Book_name}</td>
                <td>{book.genre}</td>
                <td>{book.author_name}</td>
                <td>{formatter.format(book.price)}</td>
                <td>{book.pages}</td>
                <td>{book.publisher}</td>
                <td>{book.publishing_year}</td>
                <td>{book.purchased}</td>
                <td>{book.intro}</td>
                <td>{book.image}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(book.book_id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(book.book_id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Book</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
