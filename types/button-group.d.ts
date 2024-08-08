interface ButtonGroupProps {
    locale: LocaleTypes;
    content: ButtonGroupContent;
}

interface ButtonGroupContent extends ContentType {
    data: {
        id: string;
        link: LocalizedString;
        title: LocalizedString;
    }[];
}
