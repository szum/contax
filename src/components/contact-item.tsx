import React, { useState, useEffect, useRef } from 'react';

import ContactListItem from './contact-list-item';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Person from '@material-ui/icons/Person';
import AddCircle from '@material-ui/icons/AddCircle';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Photo from '@material-ui/icons/Photo';

import { green } from '@material-ui/core/colors';

import validateEmail from '../lib/validateEmail';

const ContactItem = (props: any) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);

  const [errorMessages, setErrorMessages] = useState({
    name: undefined,
    jobTitle: undefined,
    address: undefined,
    email: undefined,
    phoneNumber: undefined
  });

  // If the contact has no ID we assume it's a blank form for creation
  useEffect(() => {
    if (!props.id) {
      setOpen(true);
      setCreating(true);
    }
  }, [props.id]);

  const handleDropdown = () => {
    setOpen(!open);
  };

  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement("input"));

  const creatingOrEditing = creating || editing;

  function validateContact(): boolean {
    let valid = true;
    let validationErrors: any = {};

    if (props.name.length === 0) {
      valid = false;
      validationErrors.name = "Contact requires a name";
    }

    if (props.email.length > 0 && !validateEmail(props.email)) {
      valid = false;
      validationErrors.email = "Enter a valid email address";
    }

    if (props.phoneNumbers.some((phoneNum: string) => phoneNum.length === 0)) {
      valid = false;
      validationErrors.phoneNumber = "Contact requires a phone number";
    }

    setErrorMessages(validationErrors);
    return valid;
  }

  return(
    <React.Fragment>
      <ListItem button onClick={handleDropdown}>
        <ListItemIcon>
          {
            props.pictureUrl
            ? <img
                src={props.pictureUrl}
                alt="Contact avatar"
                style={{ width: '35px', height: '35px', borderRadius: '50%'}}
              />
            : <Person fontSize="large" />
          }
          </ListItemIcon>
        <ListItemText primary={creating ? 'New Contact' : props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            editing || creating
            ? <ContactListItem
                id={props.id}
                name="name"
                value={props.name}
                editing={editing || creating}
                error={errorMessages.name !== undefined}
                helperText={errorMessages.name}
                handleChange={props.handleEditField}
              />
            : undefined
          }
          <ContactListItem
            id={props.id}
            name="jobTitle"
            value={props.jobTitle}
            editing={editing || creating}
            error={errorMessages.jobTitle !== undefined}
            helperText={errorMessages.jobTitle}
            handleChange={props.handleEditField}
          />
          <ContactListItem
            id={props.id}
            name="address"
            value={props.address}
            editing={editing || creating}
            error={errorMessages.address !== undefined}
            helperText={errorMessages.address}
            handleChange={props.handleEditField}
          />
          <ContactListItem
            id={props.id}
            name="email"
            value={props.email}
            editing={editing || creating}
            error={errorMessages.email !== undefined}
            helperText={errorMessages.email}
            handleChange={props.handleEditField}
          />
          {
            props.phoneNumbers.map((pn: string, idx: number) => {
              return(
                <ContactListItem
                  key={idx}
                  idx={idx}
                  id={props.id}
                  name="phoneNumber"
                  value={pn}
                  editing={editing || creating}
                  error={errorMessages.phoneNumber !== undefined}
                  helperText={errorMessages.phoneNumber}
                  handleChange={props.handleEditField}
                />
              );
            })
          }
        </List>
        <List component="nav" aria-label="secondary mailbox folder">
          {
            creatingOrEditing
            ? <ListItem
                button
                onClick={() => props.handleAddPhoneNumber(props.id)}
              >
                <ListItemIcon><AddCircle style={{ color: green[500] }} /></ListItemIcon>
                <ListItemText primary="Phone Number" />
              </ListItem>
            : undefined
          }
          {
            creatingOrEditing && !props.pictureUrl
            ? <ListItem
                button
                onClick={() => hiddenFileInput.current.click()}
              >
                <input
                  type="file"
                  style={{display:'none'}}
                  ref={hiddenFileInput}
                  onChange={(e) => props.handleUploadPicture(e, props.id)}
                />
                <ListItemIcon><Photo /></ListItemIcon>
                <ListItemText primary="Upload Picture" />
              </ListItem>
            : undefined
          }
          {
            creating &&
            <ListItem
              button
              onClick={() => {
                if (validateContact()) {
                  props.handleCreate({ name: props.name, jobTitle: props.jobTitle, address: props.address, phoneNumbers: props.phoneNumbers, email: props.email, pictureUrl: props.pictureUrl });
                  setCreating(false);
                  setOpen(false);
                }
              }}
            >
              <ListItemIcon><Save /></ListItemIcon>
              <ListItemText primary="Save" />
            </ListItem>
          }
          {
            editing &&
            <ListItem
              button
              onClick={() => {
                if (validateContact()) {
                  props.handleUpdate({ id: props.id, name: props.name, jobTitle: props.jobTitle, address: props.address, phoneNumbers: props.phoneNumbers, email: props.email, pictureUrl: props.pictureUrl });
                  setEditing(false);
                  setOpen(false);
                }
              }}
            >
              <ListItemIcon><Save /></ListItemIcon>
              <ListItemText primary="Save"  />
            </ListItem>
          }
          {
            !creating && !editing
            ? <ListItem button onClick={() => setEditing(!editing)}>
                <ListItemIcon><Edit /></ListItemIcon>
                <ListItemText primary="Edit" />
              </ListItem>
            : undefined
          }
          <ListItem
            button
            onClick={() => {
              props.handleDelete(props.id);
              setOpen(false);
            }
          }>
            <ListItemIcon><Delete color="action" /></ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

export default ContactItem;
