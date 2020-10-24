const Languages = Object.freeze({
    German: 'German',
    French: 'French',
    Russian: 'Russian',
    Spanish: 'Spanish',
    Chinese: 'Chinese',
    Danish: 'Danish',
    English: 'English',
    Swedish: 'Swedish'
})

class LanguageSpecification {
    constructor(language) {
        this.language = language
    }

    isSatisfied(item) {
        return item.language === this.language
    }
}

export { LanguageSpecification, Languages }