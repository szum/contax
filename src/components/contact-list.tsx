import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';

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

const ContactList = (props: any) => {
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
      {
        contacts.map((contact) => {
          return (
            <p>{contact.name}</p>
          );
        })
      }
    </React.Fragment>
  );
}

export default ContactList;
