// const timer = {
//   pomodoro: 25,
//   shortBreak: 5,
//   longBreak: 15,
//   longBreakInterval: 4,
//   sessions: 0,
// };

// let interval;

// const buttonSound = new Audio('button-sound.mp3');
// const mainButton = document.getElementById('js-btn');
// mainButton.addEventListener('click', () => {
//   buttonSound.play();
//   const { action } = mainButton.dataset;
//   if (action === 'start') {
//     startTimer();
//   } else {
//     stopTimer();
//   }
// });

// const modeButtons = document.querySelector('#js-mode-buttons');
// modeButtons.addEventListener('click', handleMode);

// function getRemainingTime(endTime) {
//   const currentTime = Date.parse(new Date());
//   const difference = endTime - currentTime;

//   const total = Number.parseInt(difference / 1000, 10);
//   const minutes = Number.parseInt((total / 60) % 60, 10);
//   const seconds = Number.parseInt(total % 60, 10);

//   return {
//     total,
//     minutes,
//     seconds,
//   };
// }

// function startTimer() {
//   let { total } = timer.remainingTime;
//   const endTime = Date.parse(new Date()) + total * 1000;

//   if (timer.mode === 'pomodoro') timer.sessions++;

//   mainButton.dataset.action = 'stop';
//   mainButton.textContent = 'stop';
//   mainButton.classList.add('active');

//   interval = setInterval(function() {
//     timer.remainingTime = getRemainingTime(endTime);
//     updateClock();

//     total = timer.remainingTime.total;
//     if (total <= 0) {
//       clearInterval(interval);

//       switch (timer.mode) {
//         case 'pomodoro':
//           if (timer.sessions % timer.longBreakInterval === 0) {
//             switchMode('longBreak');
//           } else {
//             switchMode('shortBreak');
//           }
//           break;
//         default:
//           switchMode('pomodoro');
//       }

//       if (Notification.permission === 'granted') {
//         const text =
//           timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
//         new Notification(text);
//       }

//       document.querySelector(`[data-sound="${timer.mode}"]`).play();

//       startTimer();
//     }
//   }, 1000);
// }

// function stopTimer() {
//   clearInterval(interval);

//   mainButton.dataset.action = 'start';
//   mainButton.textContent = 'start';
//   mainButton.classList.remove('active');
// }

// function updateClock() {
//   const { remainingTime } = timer;
//   const minutes = `${remainingTime.minutes}`.padStart(2, '0');
//   const seconds = `${remainingTime.seconds}`.padStart(2, '0');

//   const min = document.getElementById('js-minutes');
//   const sec = document.getElementById('js-seconds');
//   min.textContent = minutes;
//   sec.textContent = seconds;

//   const text =
//     timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
//   document.title = `${minutes}:${seconds} — ${text}`;

//   const progress = document.getElementById('js-progress');
//   progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
// }

// function switchMode(mode) {
//   timer.mode = mode;
//   timer.remainingTime = {
//     total: timer[mode] * 60,
//     minutes: timer[mode],
//     seconds: 0,
//   };

//   document
//     .querySelectorAll('button[data-mode]')
//     .forEach(e => e.classList.remove('active'));
//   document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
//   document.body.style.backgroundColor = `var(--${mode})`;
//   document
//     .getElementById('js-progress')
//     .setAttribute('max', timer.remainingTime.total);

//   updateClock();
// }

// function handleMode(event) {
//   const { mode } = event.target.dataset;

//   if (!mode) return;

//   switchMode(mode);
//   stopTimer();
// }

// document.addEventListener('DOMContentLoaded', () => {
//   if ('Notification' in window) {
//     if (
//       Notification.permission !== 'granted' &&
//       Notification.permission !== 'denied'
//     ) {
//       Notification.requestPermission().then(function(permission) {
//         if (permission === 'granted') {
//           new Notification(
//             'Awesome! You will be notified at the start of each session'
//           );
//         }
//       });
//     }
//   }

//   switchMode('pomodoro');
// });

import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { setMinutes } from "date-fns";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function Timer() {
  const classes = useStyles()
  const [secondsLeft, setSecondsLeft] = useState(2 * 60);
  
  const [timer, setTimer] = useState();
  
  const start = () => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1); // minus 1 second
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };
  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const stop = () => {
    clearInterval(timer);
  }

  const timerMinutes = parseInt(secondsLeft / 60)
  const seconds = parseInt(secondsLeft % 60)
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds
  


  return (
    <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Pomodoro Timer
          </Typography>
        </CardContent>
        <Typography variant="h3" className={classes.title}>
        {timerMinutes+":"+timerSeconds}
          </Typography>
        <CardContent></CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={start} className={classes.submit}>start</Button>
          <Button color="primary" variant="contained" onClick={stop} className={classes.submit}>stop</Button>
        </CardActions>

      </Card>
    )
}