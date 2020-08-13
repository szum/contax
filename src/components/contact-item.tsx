import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import ContactListItem from './contact-list-item';

const ContactItem = (props: any) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);

  const [name, setName] = useState(props.name);
  const [jobTitle, setJobTitle] = useState(props.jobTitle);
  const [address, setAddress] = useState(props.address);
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
  const [email, setEmail] = useState(props.email);

  const setStateMap: any = {
    'name': setName,
    'jobTitle': setJobTitle,
    'address': setAddress,
    'phoneNumber': setPhoneNumber,
    'email': setEmail
  };

  useEffect(() => {
    if (!props.id) {
      setOpen(true);
      setCreating(true);
    }
  }, [props.id])


  const handleDropdown = () => {
    setOpen(!open);
  };

  const handleItemChange = (type: string, value: string) => {
    setStateMap[type](value);
  }

  return(
    <React.Fragment>
      <ListItem button onClick={handleDropdown}>
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="nav" disablePadding>
          {
            editing || creating
            ? <ContactListItem
                type="name"
                value={name}
                editing={editing || creating}
                handleChange={(e: any) => handleItemChange('name', e.target.value)}
              />
            : undefined
          }
          <ContactListItem
            type="jobTitle"
            value={jobTitle}
            editing={editing || creating}
            handleChange={(e: any) => handleItemChange('jobTitle', e.target.value)}
          />
          <ContactListItem
            type="address"
            value={address}
            editing={editing || creating}
            handleChange={(e: any) => handleItemChange('address', e.target.value)}
          />
          <ContactListItem
            type="phoneNumber"
            value={phoneNumber}
            editing={editing || creating}
            handleChange={(e: any) => handleItemChange('phoneNumber', e.target.value)}
           />
          <ContactListItem
            type="email"
            value={email}
            editing={editing}
            handleChange={(e: any) => handleItemChange('email', e.target.value)}
           />
        </List>
        <List component="nav" aria-label="secondary mailbox folder">
          {
            creating
            ? <ListItem
                button
                onClick={() => {
                  props.handleCreate({ name, jobTitle, address, phoneNumber, email });
                  setCreating(false);
                  setOpen(false);
                }}
              >
                <ListItemText primary="Save" />
              </ListItem>
            : undefined
          }
          {
            editing
            ? <ListItem button
                onClick={() => {
                  props.handleUpdate({ id: props.id, name, jobTitle, address, phoneNumber, email });
                  setEditing(false);
                  setOpen(false);
                }}
              ><ListItemText primary="Save" /></ListItem>
            : undefined
          }
          {
            !creating || !editing
            ? <ListItem button onClick={() => setEditing(!editing)}><ListItemText primary="Edit" /></ListItem>
            : undefined
          }
          <ListItem button onClick={() => {
            props.handleDelete(props.id);
            setOpen(false);
          }}>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

export default ContactItem;
