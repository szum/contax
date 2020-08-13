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
                type="name"
                value={name}
                editing={editing || creating}
                handleChange={(e: any) => setName(e.target.value)}
              />
            : undefined
          }
          <ContactListItem
            type="jobTitle"
            value={jobTitle}
            editing={editing || creating}
            handleChange={(e: any) => setJobTitle(e.target.value)}
          />
          <ContactListItem
            type="address"
            value={address}
            editing={editing || creating}
            handleChange={(e: any) => setAddress(e.target.value)}
          />
          <ContactListItem
            type="email"
            value={email}
            editing={editing}
            handleChange={(e: any) => setEmail(e.target.value)}
          />
          {
            phoneNumbers.map((pn: string, idx: number) => {
              return(
                <ContactListItem
                  key={idx}
                  id={idx}
                  type="phoneNumber"
                  value={pn}
                  editing={editing}
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
                props.handleCreate({ name, jobTitle, address, phoneNumbers, email, pictureUrl });
                setCreating(false);
                setOpen(false);
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
                props.handleUpdate({ id: props.id, name, jobTitle, address, phoneNumbers, email, pictureUrl });
                setEditing(false);
                setOpen(false);
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
