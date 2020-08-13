import React, { useEffect, useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import ContactItem from './contact-item';

import * as mutations from '../graphql/mutations';


import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';


type Contact = {
  id: string;
  name: string;
  jobTitle: string;
  address: string;
  phoneNumber: string;
  email: string;
  pictureUrl: string;
}

// type Props = {
//   contacts: Array<Contact>;
// }

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const initState = {
  contacts: []
}

const initContact = {
  name: '',
  jobTitle: '',
  address: '',
  phoneNumber: '',
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
          phoneNumber: newContact.phoneNumber,
          email: newContact.email
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
          phoneNumber: contact.phoneNumber,
          email: contact.email
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

  const handleCreate = (contact: Contact) => {
    createContact(contact);
  }

  const handleDelete = (id: string) => {
    deleteContact(id);
  }

  const handleUpdate = (contact: Contact) => {
    updateContact(contact);
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
        <ListSubheader>
          <IconButton
            aria-label="add"
            onClick={() => dispatch({ type: 'addNewContact' })}
           >
            <Add fontSize="small" />
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
              phoneNumber={contact.phoneNumber}
              email={contact.email}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
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
