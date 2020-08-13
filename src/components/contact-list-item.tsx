import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import Home from '@material-ui/icons/Home';
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Help from '@material-ui/icons/Help';


const ContactListItem = (props: any) => {
  return(
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {icon(props.type)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.type} secondary={props.content} />
    </ListItem>
  );
}

const icon = (type: string) => {
  switch(type) {
    case 'Job Title':
      return (<WorkIcon />);
    case 'Address':
      return (<Home />);
    case 'Phone Number':
      return (<Phone />);
    case 'Email':
      return (<Email />);
    default:
      return (<Help />);
  }
}

export default ContactListItem;
