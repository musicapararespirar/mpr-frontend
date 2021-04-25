import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import { useTable, useSortBy } from 'react-table';


const Concerts = ({ concertList }) => {
    Moment.globalTimezone = "America/La_Paz"
    const concerts = concertList.map(con => (
    <tr key={con._id}>
        <td>{con.requesterName}</td>

        <td>{con.listenerName}</td>
        <td className="hide-sm">{con.reason}</td>
        <td>{con.preferredMusician ? con.preferredMusicianName : "No preference"}</td>
        <td className="hide-sm">{con.listenerMessage}</td>
        <td className="hide-sm">{con.listenerLocation}</td>
        <td className="hide-sm">{con.listenerNumber}</td>
        <td>{con.asap ? "ASAP" : <Fragment><Moment format='DD/MM h:mm:ss'>{con.dateFor}</Moment><br /> (<Moment fromNow>{con.dateFor}</Moment>)</Fragment>}</td>
    </tr>
    ));

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
                <Link to={`/concerts/${a._id}`}>
                    {a.requesterName}
                </Link>
            </Fragment>
        ),
       },
       {
         Header: 'For',
         accessor: 'listenerName',
       },
       {
         Header: 'Reason',
         accessor: 'reason',
       },
        {
         Header: 'Musician',
         accessor: a => (a.preferredMusician ? a.preferredMusicianName : "No preference")
       },
       {
         Header: 'Message',
         accessor: 'listenerMessage',
       },
       {
         Header: 'Location',
         accessor: 'listenerLocation',
       },
        {
         Header: 'Number',
         accessor: 'listenerNumber',
       },
        {
         Header: 'Time (in Bolivia)',
         accessor: a => <Fragment><Moment format='DD/MM h:mm:ss'>{a.dateFor}</Moment><br /> (<Moment fromNow>{a.dateFor}</Moment>)</Fragment>,
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
   } = useTable({ columns, data }, useSortBy)




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
             <tr className='table' {...row.getRowProps()}>
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

Concerts.propTypes = {
    concertList: PropTypes.array.isRequired
}

export default connect(null)(Concerts);

