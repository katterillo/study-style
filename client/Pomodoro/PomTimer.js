import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, TextField, Button, ButtonGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

 
const useStyles = makeStyles(theme => ({
  card: {
      width: 700,
      margin: 'auto',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      height: 800,
      transformOrigin: "center",
            "&.Mui-focused": {
              transformOrigin: "center"
            },
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
      textAlign: "center",
      color: theme.palette.openTitle
  },
  time: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    textAlign: "center",
    color: theme.palette.black 
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
  },
}))

export default function PomTimer() {

    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);

    useEffect(() => {
      let interval = setInterval(() => {
        clearInterval(interval)
  
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            let minutes = displayMessage ? 24 : 4
            let seconds = 59
  
            setSeconds(seconds)
            setMinutes(minutes)
            setDisplayMessage(!displayMessage)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }, [seconds])

    function setTime(time) {
      setMinutes(time-1);
      setSeconds(59);
      clearInterval(interval)
    }

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const classes = useStyles()
  return (
    <Grid item>
        <Card className={classes.sideCard} justifyContent="center" justify="center" align="center">
          <Typography variant="h6" className={classes.title} align="center">
              Pomodoro Timer
          </Typography>
          <Typography variant="h6" className={classes.time} align="center">
            {timerMinutes}:{timerSeconds}
          </Typography>
          <ButtonGroup variant="outlined" aria-label="outlined button group" >
          <Button variant="contained"
            onClick={() => {
              setTime(25);
            }}
          >
            Work Time
          </Button>
          <Button variant="contained"
            onClick={() => {
              setTime(5);
            }}
          >
            Short Break
          </Button>
          <Button variant="contained"
            onClick={() => {
              setTime(15);
            }}
          >
            Long Break
          </Button>
          </ButtonGroup>
          <Typography variant="h6" className={classes.title} align="center">
              {displayMessage}
          </Typography>
        </Card>
    </Grid>
  );
}