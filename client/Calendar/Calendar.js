import React, {useState, useEffect, useMemo} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, TextField, Button, FormControlLabel, Checkbox, Container } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardTimePicker, DatePicker} from '@material-ui/pickers'
import {create} from './api-calendar.js'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'
import {list} from './api-calendar.js'
import Table from "./Table-Calendar";
import axios from 'axios';
import styled from 'styled-components' 
import events from './events'; 


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


const useStyles = makeStyles(theme => ({
    card: {
        width: 700,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        height: 800,
        padding: 20
      },
    sideCard: {
        width: 400,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        maxHeight: 800,
        padding: 20,
        overflow: true
      },
    title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    desciption: {
        width: "55ch",
        "& label": {
          width: "100%",
          textAlign: "center",
          transformOrigin: "center",
            "&.Mui-focused": {
              transformOrigin: "center"
            }
         }
      },
    eventName: {
        width: "45ch",
        "& label": {
          width: "100%",
          textAlign: "center",
          transformOrigin: "center",
            "&.Mui-focused": {
              transformOrigin: "center"
            }
         }
      },
    location: {
        width: "35ch",
        marginTop: 20,
      },
    scroll: {
        overflow: "auto"
    },
    inLine: {
        alignItems: "center",
        margin: 10   
    }
}))

var currentEvents = [];
var selectedDate;
export default function CalendarPage() {
    //for react table
    const [data, setData] = useState([]);
  
  
    useEffect(() => {
      (async () => {
        const result = await axios("http://localhost:3000/api/calendars");
        setData(result.data);
      })();
    }, []);
  
    const columns = useMemo(
      () => [
        {
         
          Header: "Events",
          // First group columns
          columns: [
            {
              Header: "Name",
              accessor: "eventName"
            },
            {
              Header: "Description",
              accessor: "description"
            },
            {
              Header: "Date",
              accessor: "date"
            },
            {
              Header: "Time",
              accessor: "time"
            },
            {
              Header: "Location",
              accessor: "location"
            },
          ]
        },
      ],
      []
    );
  
    const [calendars, setCalendars] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
    
        list(signal).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
              setCalendars(data)
          }
        })
    
        return function cleanup(){
          abortController.abort()
        }
      }, [])

    const [values, setValues] = useState({
        date: new Date(), //this is just a default value
        time: ("2018-01-01T00:00:00.000Z"),
        eventName: '',
        description:'',
        studytime: '',
        location: '',
        open: false,
        remote: false,
        error: '',
       // redirectToProfile: false
      })
      //just the default value p sure
     // const [date, changeDate] = useState(new Date());

    const clickSubmit = () => {
        console.log("top of clicksubmit");
        const calendar = {
            date: values.date || undefined,
            time: values.time || undefined,
            eventName: values.eventName || undefined,
            description: values.description || undefined,
            location: values.location || undefined,
            remote: values.remote || undefined
          }
          
          events.push(
            {
              'title': calendar.eventName,
              'start' : calendar.date,
              'time' : calendar.time,
              'location': calendar.location,
              desc: calendar.description
            }
          )

          for (let i = 0; i < events.length; i++) {
            if (events[i].start.toDateString() === calendar.date.toDateString() && !currentEvents.includes(events[i]))
              currentEvents.push(events[i]);
          }

          create(calendar).then((data) => {
            console.log("inside clicksubmit, data: " + data);
            if (data.error) {
              setValues({ ...values, error: data.error})
            } else {
              setValues({ ...values, error: '', open: true})
            }
          })
        }

 

    const handleChange = name => event => {
        let value = '';

        if (name === 'date') {
          currentEvents = [];

          for (let i = 0; i < events.length; i++) {
            if (events[i].start.toDateString() === event.toDateString())
              currentEvents.push(events[i]);
              console.log(events[i].start)
              console.log(event)
          }
          console.log(currentEvents)
        }

        if (name === 'date' || name === 'time') { 
                value = event 
            } 
        else { 
            value = event.target.value 
        }
        setValues({...values, [name]: value
        });
      
    }
    
    const [show, setShow] = useState(true);

   
    const handleCheckbox = (event) => {
        if (event.target.checked == false)
            setShow(true);
        else
            setShow(false);
    }
    
    const handleClose = name => event => {
        setValues({...values, [name]: event.target.value
      })
    }
     

    const classes = useStyles()
    return (
        <Grid container justify="center" spacing={3}>
            <Grid item>
                <Card className={classes.card} justifyContent="center" justify="center">

                    <Typography variant="h6" className={classes.title} align="center">
                        Create a Study Event
                    </Typography>

                    <Grid container justify="center" alignItems="center" direction="column" spacing={5}>
                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    autoOk
                                    orientation="landscape"
                                    variant="static"
                                    openTo="date"
                                    value={values.date}
                                    selectedDate={values.date}
                                    onChange={handleChange('date')}/>   
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    id="timePicker"
                                    label="Time"
                                    onChange={handleChange('time')}
                                    value={values.time}/> 
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item>
                            <form align="center">
                                <Box
                                    justifyContent="center"
                                    justifyItems="center"
                                    component="form"
                                    display="flex"
                                    flexDirection="column"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1 }
                                    }}
                                    noValidate
                                    autoComplete="off">
                                        
                                        <TextField
                                            id="EventName"
                                            className={classes.eventName}
                                            onChange={handleChange('eventName')}
                                            value={values.eventName}
                                            label="Event Name"
                                            placeholder="Name of Event"
                                            margin="dense"/>
                                
                                        <TextField
                                            id="EventDesc"
                                            className={classes.desciption}
                                            onChange={handleChange('description')}
                                              value={values.description}
                                            label="Description"
                                            placeholder="Description of event"
                                            multiline
                                            margin="dense"/>
                                        
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'}}>

                                                {show && <TextField
                                                    className={classes.location}
                                                    id="Location"
                                                    label="Location"
                                                    variant="outlined" 
                                                    onChange={handleChange('location')}
                                                    value={values.location}
                                                    />}
                                                
                                                {/* <FormControlLabel
                                                    className={classes.inLine}
                                                    value={false}
                                                    control={<Checkbox 
                                                                onChange={handleChange('remote')}/>}
                                                    label="Remote"
                                                    labelPlacement="end"/>   */}
                                        </div>          
                                </Box>
                                <Button 
                                    style={{
                                        marginTop: 20,
                                        backgroundColor: "#ff4081",
                                        padding: "12px 18px",
                                        fontSize: "16px"
                                    }}
                                    variant="contained" onClick={clickSubmit}>Create Event!
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Dialog open={values.open} >
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New event successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/calendar">
            <Button color="primary" onClick={handleClose('open')} autoFocus="autoFocus" variant="contained">
            Dismiss
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
            <Grid item>
                <Card  justifyContent="center" justify="center">
                <Typography variant="h5" className={classes.title} align="center">
                    Study Events for the Day
                </Typography>
                
                <Grid justifyContent="center" justify="center" spacing={50}>
                {currentEvents.map(function(currentEvents) {
                  return (
                    <Grid item>
                    <Typography variant="h6" className={classes.title} align="center">
                      {currentEvents.title}
                      </Typography>
                      <Typography variant="h7" className={classes.title} align="center">Location: {currentEvents.location}</Typography>
                      <Typography variant="h7" className={classes.title} align="center">Description: {currentEvents.desc}</Typography>
                    </Grid>
                  )
                })}
                </Grid>
      
                </Card>
      
            </Grid>
        </Grid>
    )
};
