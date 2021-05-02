import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import { useTable, useSortBy } from 'react-table';


const ConcertList = ({ concertList }) => {
    Moment.globalTimezone = "America/La_Paz"

    const data = React.useMemo(
     () => concertList,
     []
   )

   const columns = React.useMemo(
     () => [
       {
         Header: 'From',
         accessor: a => (
             <Fragment>
                <Link to={`/concerts/${a._id}`} className='link'>
                    {a.requesterName}
                </Link>
            </Fragment>
        ),
        getProps: (state, rowInfo, column) => {
            return {
                style: {
                    background: rowInfo && rowInfo.row.reason === "gift" ? 'red' : null,
                },
            };
        }
       },
       {
         Header: 'For',
         accessor: 'listenerName',
       },
       {
         Header: 'Reason',
         accessor: 'reason',
         headerClassName: 'hide-sm',
         className: 'hide-sm'
       },
        {
         Header: 'Musician',
         accessor: a => (a.preferredMusician ? a.preferredMusicianName : "No preference")
       },
       {
         Header: 'Time (in Bolivia)',
         accessor: a =>
            <Fragment>
                <Moment format='DD/MM h:mm:ss'>{a.dateFor}</Moment><br /> (<Moment fromNow>{a.dateFor}</Moment>)
            </Fragment>,
       },
     ],
     []
   )

   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data },
                useSortBy)

    return (
        <Fragment>
            <h2 className="my-2">Concert Requests</h2>
             <table {...getTableProps()} style={{ border: 'solid 1px grey' }}>

       <thead>
         {headerGroups.map(headerGroup => (
           <tr className='table' {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                 {column.render('Header')}
                                   <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr className='table' {...row.getRowProps()} style={{ background: row.original.scheduled ? '#006837' : '#a50026' }}>{console.log(row)}
               {row.cells.map(cell => {
                 return (
                   <td {...cell.getCellProps()}>
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     </Fragment>
    )
}

ConcertList.propTypes = {
    concertList: PropTypes.array.isRequired
}

export default connect(null)(ConcertList);

