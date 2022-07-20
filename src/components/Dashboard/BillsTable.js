import React from 'react';

const BillsTable = ({ bills }) => {
  const shortForm = (intro) => {
    const numChar = 20;
    
    if (intro.length <= numChar) return intro;
    return intro.substr(0, numChar - 1) + "...";
  }

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
            <th>Address</th>
            <th>Phone Number</th>
            <th>Created Date</th>
            <th>Total Money</th>
          </tr>
        </thead>
        <tbody>
          {bills.length > 0 ? (
            bills.map((bill, i) => (
              <tr key={bill.bill_id}>
                <td>{i + 1}</td>
                <td>{shortForm(bill.name)}</td>
                <td>{shortForm(bill.address)}</td>
                <td>{shortForm(bill.phone_number)}</td>
                <td>{shortForm(bill.date_bill)}</td>
                <td>{formatter.format(bill.total_money)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12}>No Bill Existed</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillsTable;
