import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (!currency) return;

        const curr = currency.toLowerCase();
        const api_link = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${curr}.json`

        fetch(api_link)
            .then(res => res.json())
            .then((res) => setData(res[curr]))
            .catch((err) => console.error("Error fetching currency data:", err));

    }, [currency]);

    return data;
}

export default useCurrencyInfo;