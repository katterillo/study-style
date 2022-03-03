import React, {useState, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {list} from './api-user.js'
import ReactTable from 'react-table'
import Table from "./Table";
import axios from 'axios';
import styled from 'styled-components'

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

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin: auto;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export default function Users() { 
  const classes = useStyles()
  const [users, setUsers] = useState([])
  //for react table
  const [data, setData] = useState([]);


  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:3000/api/userprofiles");
      setData(result.data);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
       
        Header: "Users",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Email",
            accessor: "email"
          },
          {
            Header: "Goal",
            accessor: "goal"
          },
          {
            Header: "Preferred Music Genre",
            accessor: "genre"
          },
          {
            Header: "Study Time Preference",
            accessor: "studytime"
          },
        ]
      },
      // {
 
      //   Header: "Details",
      //   // Second group columns
      //   columns: [
      //     {
      //       Header: "Language",
      //       accessor: "show.language"
      //     },
      //     {
      //       Header: "Genre(s)",
      //       accessor: "show.genres"
      //     },
      //     {
      //       Header: "Runtime",
      //       accessor: "show.runtime"
      //     },
      //     {
      //       Header: "Status",
      //       accessor: "show.status"
      //     }
      //   ]
      // }
    ],
    []
  );

    return (
        <Styles>
      <Table columns={columns} data={data} />
      </Styles>
    )
}
