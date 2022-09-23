import axios from "axios";
import { useState, useEffect } from "react";

const Quotes = () => {
    const [quotes, setQuotes] = useState([
        {
            quote: "",
            author: "",
        },
    ]);

    const getQuote = async () => {
        await axios
            .get("https://favqs.com/api/qotd")
            .then((response) => {
                setQuotes({
                    quote: JSON.stringify(response.data.quote.body).replaceAll("\"", ""),
                    author: JSON.stringify(response.data.quote.author).replaceAll("\"", ""),
                });
            }).catch((error) => console.log(error));
            
    };

    useEffect(() => {
        getQuote();
    }, []);

    return (
        <>
            <span>{String(quotes.quote).length >= 200 ? `${String(quotes.quote).slice(0, 200)}...` : quotes.quote}</span>
            <span>-{quotes.author}-</span>
        </>
    );
};

export default Quotes;
