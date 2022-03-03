
import React, {useState, useEffect, useMemo } from 'react'

import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {list} from './api-calendar.js'
import regeneratorRuntime from "regenerator-runtime";

import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'



const useStyles = makeStyles(theme => ({
root: theme.mixins.gutters({
  padding: theme.spacing(1),
  margin: theme.spacing(5)
}),
title: {
  margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
  color: theme.palette.openTitle
}
}))

// Define a default UI for filtering
function GlobalFilter({
preGlobalFilteredRows,
globalFilter,
setGlobalFilter,
}) {
const count = preGlobalFilteredRows.length
const [value, setValue] = React.useState(globalFilter)
const onChange = useAsyncDebounce(value => {
  setGlobalFilter(value || undefined)
}, 200)

return (
  <span>
    Search:{' '}
    <input
      value={value || ""}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`${count} events...`}
      style={{
        fontSize: '1.1rem',
        border: '0',
      }}
    />
  </span>
)
}

// Define a default UI for filtering
function DefaultColumnFilter({
column: { filterValue, preFilteredRows, setFilter },
}) {
const count = preFilteredRows.length

return (
  <input
    value={filterValue || ''}
    onChange={e => {
      setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
    }}
    placeholder={`Search ${count} records...`}
  />
)
}

export default function Table({ columns, data }) {
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        preGlobalFilteredRows,
        setFilter // The useFilter Hook provides a way to set the filter
      } = useTable(
        {
          columns,
          data
        },
        useFilters,
        useGlobalFilter // Adding the useFilters Hook to the table
        // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
        
      );
    const classes = useStyles()
    const [users, setUsers] = useState([])
  
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      list(signal).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
          setUsers(data)
        }
      })
  
      return function cleanup(){
        abortController.abort()
      }
    }, [])

    const [filterInput, setFilterInput] = useState("");

// Update the state when input changes
const handleFilterChange = e => {
const value = e.target.value || undefined;
setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
setFilterInput(value);
};
  
    /* 
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    return (
        <div>
           <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
      <table {...getTableProps()}>
           {/* {users.map((item, i) => {
      return <Link to={"/userprofile/" + item._id} key={i}> */}
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        {/* // </Link> */}
        {/* }) */}
      
        <tbody {...getTableBodyProps()}>
               {/* {users.map((item, i) => {
      return <Link to={"/userprofile/" + item._id} key={i}> */}
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
          {/* </Link>
               })
            } */}
        </tbody>
      </table>
      </div>
    );
  }
