import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';

import Contact from './contact';

type Contact = {
  id: string;
  name: string;
  jobTitle: string;
  address: string;
  phoneNumber: string;
  email: string;
  pictureUrl: string;
}

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

// type Props = {
//   contacts: Array<Contact>;
// }

const ContactList = (props: any) => {
  const classes = useStyles();
  const [contacts, setContacts] = useState<Array<Contact>>([]);

  async function fetchContacts() {
    try {
      const list: any = await API.graphql(graphqlOperation(queries.listContacts));
      if (list) {
        setContacts(list.data.listContacts.items);
      }
    } catch (error) {
      console.log(error);
    }
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
      </List>
      <ul>
        {
          contacts.map((contact) => {
            return (
              <Contact
                key={contact.id}
                name={contact.name}
                address={contact.address}
                jobTitle={contact.jobTitle}
                phoneNumber={contact.phoneNumber}
                email={contact.email}
              />
            );
          })
        }
      </ul>
    </React.Fragment>
  );
}

export default ContactList;
