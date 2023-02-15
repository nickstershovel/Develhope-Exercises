import { useContext } from 'react';
import { LanguageContext } from './languagecontext'

const DisplayLanguage = () => {
  const { selectedLanguage } = useContext(LanguageContext);

  return (
    <div>
      <h1>Selected Language: {selectedLanguage}</h1>
      {selectedLanguage === 'en' && <div>Hello World!</div>}
      {selectedLanguage === 'es' && <div>Hola Mundo!</div>}
      {selectedLanguage === 'fr' && <div>Bonjour le Monde!</div>}
    </div>
  );
};


export default DisplayLanguage;