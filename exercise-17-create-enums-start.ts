enum Currency {
    Euro = "Euro",
    Dollar = "Dollar"
}

interface Country {
    name: string;
    currency: Currency;
}

const countries: Country[] = [
    {
        name: "France",
        currency: Currency.Euro,
    },
    {
        name: "United States of America",
        currency: Currency.Dollar,
    },
    {
        name: "Italy",
        currency: Currency.Euro,
    },
    {
        name: "New Zealand",
        currency: Currency.Dollar,
    },
];

enum LanguageStatus {
    Primary = "primary",
    Secondary = "secondary"
}

const countryLanguages = [
    { language: "Spanish", status: LanguageStatus.Primary },
    { language: "English", status: LanguageStatus.Secondary },
];

export { };