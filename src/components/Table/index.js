import React, { useState, useEffect} from 'react';
import {TableRow} from '../index'
import './index.css'

const Table = ({issueDetails,issues, handleIsReviewed, sortIssues} ) => {

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(()=>{
    sortIssues(sortColumn,sortOrder);
  },[sortColumn,sortOrder,sortIssues])

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };

  const renderSortArrows = (columnName) => {
    if (sortColumn === columnName) {
      return sortOrder === 'asc' ?'▲' : '▼';
    }
    return null;
  };


  return (
    <div className='table-container'>
      <table className='table'>
        <thead>
          <tr className='table-header'>
            {issueDetails && issueDetails.map((column, index) => (
              <th
                key={index}
                onClick={column.canBeSorted ? () => handleSort(column.name) : undefined}
                className={`table-head $column.canBeSorted ? 'sortable' : ''`}
              >
                {column.name} {renderSortArrows(column.name)}
              </th>
            ))}
          </tr>
          {issues&&console.log(issues)}
        </thead>
        <tbody>
          {issues && Object.values(issues).map((issue, index) => (
              <TableRow key={index} issue={issue} index={index} handleIsReviewed={handleIsReviewed} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
