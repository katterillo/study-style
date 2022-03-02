import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardTimePicker, DatePicker} from '@material-ui/pickers'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'



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

export default function CalendarPage() {

    const [date, changeDate] = useState(new Date());
    const [selectedTime, handleTimeChange] = useState("2018-01-01T00:00:00.000Z");

    
    const [show, setShow] = useState(true);
    const handleCheckbox = (event) => {
        if (event.target.checked == false)
            setShow(true);
        else
            setShow(false);
    }
    
    const handleSubmit = evt => {
        
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
                                    value={date}
                                    onChange={changeDate}/>   
                                
                                
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    id="timePicker"
                                    label="Time"
                                    value={selectedTime}
                                    onChange={handleTimeChange}/> 
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item>
                            <form onSubmit={handleSubmit} align="center">
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
                                            label="Event Name"
                                            placeholder="Name of Event"
                                            margin="dense"/>
                                
                                        <TextField
                                            id="EventDesc"
                                            className={classes.desciption}
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
                                                    variant="outlined" />}
                                                
                                                <FormControlLabel
                                                    className={classes.inLine}
                                                    value="Remote"
                                                    control={<Checkbox 
                                                                onChange={handleCheckbox}/>}
                                                    label="Remote"
                                                    labelPlacement="end"/>  
                                        </div>          
                                </Box>
                                <Button 
                                    style={{
                                        marginTop: 20,
                                        backgroundColor: "#ff4081",
                                        padding: "12px 18px",
                                        fontSize: "16px"
                                    }}
                                    variant="contained" onSubmit={handleSubmit()}>Create Event!
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item>
                <Card className={classes.sideCard} justifyContent="center" justify="center">
                <Typography variant="h6" className={classes.title} align="center">
                    Study Events invited to or created by you
                </Typography>
                </Card>
            </Grid>
        </Grid>
    )
};
