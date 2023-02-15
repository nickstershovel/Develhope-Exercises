import { useContext } from 'react';
import { LanguageContext } from './languagecontext'

const DisplayLanguage = () => {
    const { selectedLanguage } = useContext(LanguageContext);

    switch (selectedLanguage) {
        case 'es':
            return <div>Hola mundo!</div>;
        case 'fr':
            return <div>Bonjour le monde!</div>;
        default:
            return <div>Hello world!</div>;
    }
};

export default DisplayLanguage;