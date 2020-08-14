import React, { useEffect, useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Storage } from 'aws-amplify';

import ContactItem from './contact-item';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

type Contact = {
  id: string;
  name: string;
  jobTitle: string;
  address: string;
  phoneNumbers: Array<string>;
  email: string;
  pictureUrl: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

const initState = {
  contacts: []
}

const initContact = {
  id: undefined,
  name: '',
  jobTitle: '',
  address: '',
  phoneNumbers: [''],
  email: '',
  pictureUrl: ''
}

const ContactList = (props: any) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initState);

  async function fetchContacts() {
    try {
      const listQuery: any = await API.graphql(graphqlOperation(queries.listContacts));
      if (listQuery) {
        dispatch({ type: 'fetchSuccess', payload: listQuery.data.listContacts.items });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createContact(newContact: Contact) {
    try {
      const createMutation: any = await API.graphql(graphqlOperation(mutations.createContact, {
        input: {
          name: newContact.name,
          jobTitle: newContact.jobTitle,
          address: newContact.address,
          phoneNumbers: newContact.phoneNumbers,
          email: newContact.email,
          pictureUrl: newContact.pictureUrl
        }
      }));
      if (createMutation) {
        dispatch({ type: 'createContact', payload: createMutation.data.createContact });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateContact(contact: Contact) {
    try {
      const updateMutation: any = await API.graphql(graphqlOperation(mutations.updateContact, {
        input: {
          id: contact.id,
          name: contact.name,
          jobTitle: contact.jobTitle,
          address: contact.address,
          phoneNumbers: contact.phoneNumbers,
          email: contact.email,
          pictureUrl: contact.pictureUrl
        }
      }));
      if (updateMutation) {
        dispatch({ type: 'updateContact', payload: updateMutation.data.updateContact });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteContact(id: string) {
    if (id === undefined) {
      dispatch({ type: 'deleteContact', payload: undefined });
    } else {
      try {
        const deleteMutation: any = await API.graphql(graphqlOperation(mutations.deleteContact, {
          input: {
            id
          }
        }));
        if (deleteMutation) {
          dispatch({ type: 'deleteContact', payload: deleteMutation.data.deleteContact.id });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleUploadPicture(event: any, id: string) {
    const file = event.target.files[0];
    const upload: any = await Storage.put(`${file.name}`, file, { contentType: file.type });
    const picture = await Storage.get(upload.key);
    dispatch({ type: 'editContactField', payload: {
      id,
      field: 'pictureUrl',
      value: picture
    }});
  }

  function editFieldHandler(event: any, id: string, idx: number) {
    dispatch({ type: 'editContactField', payload: {
      id,
      idx,
      field: event.target.name,
      value: event.target.value,
    }});
  }

  function addPhoneNumberHandler(id: string) {
    dispatch({ type: 'addPhoneNumber', payload: { id }});
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <React.Fragment>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListSubheader component="div">
          <IconButton
            aria-label="add"
            style={{ padding: 0 }}
            onClick={(e) => {
              dispatch({ type: 'addNewContact' });
            }}
           >
            <Add fontSize="large" color="primary" />
          </IconButton>
        </ListSubheader>
      </List>
      {
        state.contacts.map((contact: Contact, idx: Number) => {
          return (
            <ContactItem
              key={idx}
              id={contact.id}
              name={contact.name}
              address={contact.address}
              jobTitle={contact.jobTitle}
              phoneNumbers={contact.phoneNumbers}
              email={contact.email}
              pictureUrl={contact.pictureUrl}
              handleCreate={(contact: Contact) => createContact(contact)}
              handleUpdate={(contact: Contact) => updateContact(contact)}
              handleEditField={editFieldHandler}
              handleAddPhoneNumber={addPhoneNumberHandler}
              handleDelete={(id: string) => deleteContact(id)}
              handleUploadPicture={handleUploadPicture}
            />
          );
        })
      }
    </React.Fragment>
  );
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'fetchSuccess':
      return {...state, contacts: [...action.payload] };
    case 'deleteContact':
      return {
        ...state,
        contacts: [...state.contacts.filter((con: Contact) => con.id !== action.payload)]
      }
    case 'addNewContact':
      return {
        ...state,
        contacts: [...state.contacts, initContact]
      }
    case 'createContact':
      return {
        ...state,
        contacts: [...state.contacts.filter((con: Contact) => con.id !== undefined), action.payload],
      }
    case 'editContactField':
      return {
        ...state,
        contacts: state.contacts.map((con: Contact) => {
          if (con.id === action.payload.id) {
            if (action.payload.field === 'phoneNumber') {
              const newNumbers = con.phoneNumbers.slice(0);
              newNumbers[action.payload.idx] = action.payload.value;
              return { ...con, phoneNumbers: newNumbers };
            } else {
              return { ...con, [action.payload.field]: action.payload.value };
            }
          }
          return con;
        })
      }
    case 'addPhoneNumber':
      return {
        ...state,
        contacts: state.contacts.map((con: Contact) => {
          if (con.id === action.payload.id) {
            return { ...con, phoneNumbers: [...con.phoneNumbers, ''] };
          }
          return con;
        })
      }
    case 'updateContact':
      return {
        ...state,
        contacts: state.contacts.map((con: Contact) => {
          if (con.id === action.payload.id) {
            return action.payload;
          }
          return con;
        })
      }
    default:
      throw new Error();
  }
}

export default ContactList;
