type Contact = {
  id: string;
  name: string;
  jobTitle: string;
  address: string;
  phoneNumbers: Array<string>;
  email: string;
  pictureUrl: string;
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

function contactsReducer(state: any, action: any) {
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

export default contactsReducer;
