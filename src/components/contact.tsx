import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import ContactListItem from './contact-list-item';


const Contact = (props: any) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return(
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ContactListItem type="Job Title" content={props.jobTitle}  />
          <ContactListItem type="Address" content={props.address}  />
          <ContactListItem type="Phone Number" content={props.phoneNumber}  />
          <ContactListItem type="Email" content={props.email}  />
        </List>
      </Collapse>
    </React.Fragment>
  );
}

export default Contact;
