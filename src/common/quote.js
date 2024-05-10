export default function getRandomQuote() {
    const quoteObjs = [
        {
            "q": "Live as if you were to die tomorrow. Learn as if you were to live forever.",
            "a": "Mahatma Gandhi"
        },
        {
            "q": "He who knows all the answers has not been asked all the questions.",
            "a": "Confucius"
        },
        {
            "q": "It does not matter how slowly you go as long as you do not stop.",
            "a": "Confucius"
        },
        {
            "q": "I have not failed. I've just found 10,000 ways that won't work.",
            "a": "Thomas A. Edison"
        },
        {
            "q": "And, when you want something, all the universe conspires in helping you to achieve it.",
            "a": "Paulo Coelho"
        },
    ]

    let randChoice = Math.floor(Math.random() * quoteObjs.length);
    while (randChoice === quoteObjs.length) {randChoice = Math.floor(Math.random() * quoteObjs.length);}

    return quoteObjs[randChoice]
}