import React from 'react';
import toTitleCase from '../lib/toTitleCase';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import Home from '@material-ui/icons/Home';
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Help from '@material-ui/icons/Help';
import Person from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(8),
    },
  }),
);

const ContactListItem = (props: any) => {
  const classes = useStyles();

  return(
    <ListItem className={classes.nested}>
      <ListItemAvatar>
        <Avatar>
          {icon(props.name)}
        </Avatar>
      </ListItemAvatar>
      {
        props.editing
        ? editContactItem(props)
        : <ListItemText primary={toTitleCase(props.name)} secondary={props.value} />
      }
    </ListItem>
  );
}

const editContactItem = (props: any) => {
  return(
    <ListItemText>
      <TextField
        id="standard-basic"
        label={toTitleCase(props.name)}
        name={props.name}
        value={props.value}
        error={props.error}
        helperText={props.helperText}
        onChange={(e) => props.handleChange(e, props.id)}
        fullWidth
      />
    </ListItemText>
  );
}

const icon = (name: string) => {
  switch(name) {
    case 'jobTitle':
      return (<WorkIcon />);
    case 'address':
      return (<Home />);
    case 'phoneNumber':
      return (<Phone />);
    case 'email':
      return (<Email />);
    case 'name':
      return (<Person />);
    default:
      return (<Help />);
  }
}

export default ContactListItem;
