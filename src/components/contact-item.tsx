import React, { useState, useEffect, useRef } from 'react';
import { Storage } from 'aws-amplify';

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

  const [name, setName] = useState(props.name);
  const [jobTitle, setJobTitle] = useState(props.jobTitle);
  const [address, setAddress] = useState(props.address);
  const [phoneNumbers, setPhoneNumbers] = useState(props.phoneNumbers);
  const [pictureUrl, setPictureUrl] = useState(props.pictureUrl);
  const [email, setEmail] = useState(props.email);

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

  const handlePhoneNumbersChange = (event: any, index: number) => {
    const newNumbers = phoneNumbers.slice(0);
    newNumbers[index] = event.target.value;
    setPhoneNumbers(newNumbers);
  }

  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement("input"));

  async function handleUploadPicture(event: any) {
    const file = event.target.files[0];
    const upload: any = await Storage.put(`${file.name}`, file, { contentType: file.type });
    const picture = await Storage.get(upload.key);
    setPictureUrl(picture);
  }

  const creatingOrEditing = creating || editing;

  function validateContact(): boolean {
    let valid = true;
    let validationErrors: any = {};

    if (name.length > 0) {
      valid = false;
      validationErrors.name = "Contact requires a name";
    }

    if (email.length > 0 && !validateEmail(email)) {
      valid = false;
      validationErrors.email = "Enter a valid email address";
    }

    setErrorMessages(validationErrors);
    return valid;
  }

  return(
    <React.Fragment>
      <ListItem button onClick={handleDropdown}>
        <ListItemIcon>
          {
            pictureUrl
            ? <img
                src={pictureUrl}
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
                name="name"
                value={name}
                editing={editing || creating}
                error={errorMessages.name !== undefined}
                helperText={errorMessages.name}
                handleChange={(e: any) => setName(e.target.value)}
              />
            : undefined
          }
          <ContactListItem
            name="jobTitle"
            value={jobTitle}
            editing={editing || creating}
            error={errorMessages.jobTitle !== undefined}
            helperText={errorMessages.jobTitle}
            handleChange={(e: any) => setJobTitle(e.target.value)}
          />
          <ContactListItem
            name="address"
            value={address}
            editing={editing || creating}
            error={errorMessages.address !== undefined}
            helperText={errorMessages.address}
            handleChange={(e: any) => setAddress(e.target.value)}
          />
          <ContactListItem
            name="email"
            value={email}
            editing={editing}
            error={errorMessages.email !== undefined}
            helperText={errorMessages.email}
            handleChange={(e: any) => setEmail(e.target.value)}
          />
          {
            phoneNumbers.map((pn: string, idx: number) => {
              return(
                <ContactListItem
                  key={idx}
                  id={idx}
                  name="phoneNumber"
                  value={pn}
                  editing={editing}
                  error={errorMessages.phoneNumber !== undefined}
                  helperText={errorMessages.phoneNumber}
                  handleChange={handlePhoneNumbersChange}
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
                onClick={() => setPhoneNumbers([...phoneNumbers, ''])}
              >
                <ListItemIcon><AddCircle style={{ color: green[500] }} /></ListItemIcon>
                <ListItemText primary="Phone Number" />
              </ListItem>
            : undefined
          }
          {
            creatingOrEditing && !pictureUrl
            ? <ListItem
                button
                onClick={() => hiddenFileInput.current.click()}
              >
                <input
                  type="file"
                  style={{display:'none'}}
                  ref={hiddenFileInput}
                  onChange={handleUploadPicture}
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
                  props.handleCreate({ name, jobTitle, address, phoneNumbers, email, pictureUrl });
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
                  props.handleUpdate({ id: props.id, name, jobTitle, address, phoneNumbers, email, pictureUrl });
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
