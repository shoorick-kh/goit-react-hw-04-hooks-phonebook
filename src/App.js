import { useEffect, useState } from 'react';
import s from './App.module.css';
import ContactForm from './components/ContactForm/ContactForm';
import shortid from 'shortid';
import ContactList from './components/ContactList/ContactList';
import FilterName from './components/FilterName/FilterName';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const handlerSubmitForm = data => {
    const newContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
      )
    ) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    setContacts(() => [...contacts, newContact]);
  };

  const onChangeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
  return (
    <div className={s.App}>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={handlerSubmitForm} />
      <FilterName value={filter} onChange={onChangeFilter} />
      <h2>Contacts</h2>
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}
