import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
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

export default function EditProfile({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    goal:'',
    studytime: '',
    genre: '',
    open: false,
    error: '',
    redirectToProfile: false
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name: data.name, email: data.email, studytime: data.studytime, goal: data.goal, genre: data.genre})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      studytime: values.studytime || undefined,
      goal: values.goal || undefined,
      genre: values.genre || undefined
    }
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, userId: data._id, redirectToProfile: true})
      }
    })
  }
  const handleChange = name => event => {
    console.log(event);
    setValues({...values, [name]: event.target.value})
    console.log(event);
  }

    if (values.redirectToProfile) {
      return (<Redirect to={'/userprofile/' + values.userId}/>)
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Study Profile
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">When do you prefer to study?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.studytime}
                label="StudyTime"
                onChange={handleChange('studytime')}
        >
          <MenuItem value={"N/A"}>N/A</MenuItem>
          <MenuItem value={"Morning"}>Morning</MenuItem>
          <MenuItem value={"Afternoon"}>Afternoon</MenuItem>
          <MenuItem value={"Evening"}>Evening</MenuItem>
          <MenuItem value={"Night"}>Night</MenuItem>
   
        </Select>
      </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">What is your main goal?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.goal}
                label="goal"
                onChange={handleChange('goal')}
        >
          <MenuItem value={"N/A"}>N/A</MenuItem>
          <MenuItem value={"Improve my grades"}>Improve my grades</MenuItem>
          <MenuItem value={"Build good study habits"}>Build good study habits</MenuItem>
          <MenuItem value={"Complete my homework"}>Complete my homework</MenuItem>
          <MenuItem value={"Stay focused for longer periods"}>Stay focused for longer periods</MenuItem>
          <MenuItem value={"Share resources"}>Share resources</MenuItem>
          <MenuItem value={"Find similar users"}>Find similar users</MenuItem>
          <MenuItem value={"Be more motivated to study"}>Be more motivated to study</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">What genre of music do you most like to listen to while studying?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.genre}
                label="genre"
                onChange={handleChange('genre')}
        >
          <MenuItem value={"N/A"}>rock</MenuItem>
          <MenuItem value={"country"}>country</MenuItem>
          <MenuItem value={"pop"}>pop</MenuItem>
          <MenuItem value={"rap"}>rap</MenuItem>
          <MenuItem value={"classical"}>classical</MenuItem>
          <MenuItem value={"hip hop"}>hip hop</MenuItem>
          <MenuItem value={"metal"}>metal</MenuItem>
          <MenuItem value={"rock"}>rock</MenuItem>
          <MenuItem value={"edm"}>edm</MenuItem>
          <MenuItem value={"punk"}>punk</MenuItem>
          <MenuItem value={"dance"}>dance</MenuItem>
          <MenuItem value={"alternative"}>alternative</MenuItem>
          <MenuItem value={"lo-fi"}>lo-fi</MenuItem>

        </Select>
      </FormControl>
    </Box>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
}

