import React, { useState, createContext } from 'react';
import DisplayLanguage from './displaylanguage';

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // set the default language as English

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage }}>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
      <DisplayLanguage/>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;