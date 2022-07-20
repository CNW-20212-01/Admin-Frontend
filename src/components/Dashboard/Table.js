import React from 'react';

const Table = ({ books, handleEdit, handleDelete }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  const shortForm = (intro) => {
    const numChar = 20;
    
    if (intro.length <= numChar) return intro;
    return intro.substr(0, numChar - 1) + "...";
  }

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
                <td>{shortForm(book.book_name)}</td>
                <td>{shortForm(book.genre)}</td>
                <td>{shortForm(book.author_name)}</td>
                <td>{formatter.format(book.price)}</td>
                <td>{book.pages}</td>
                <td>{shortForm(book.publisher)}</td>
                <td>{book.publishing_year}</td>
                <td>{book.purchased}</td>
                <td>{shortForm(book.intro)}</td>
                <td>{shortForm(book.image)}</td>
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
              <td colSpan={12}>No Book Existed</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
