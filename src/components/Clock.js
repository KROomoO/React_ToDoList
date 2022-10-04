import { useState } from "react";

const Clock = () => {
    const [watch, setWatch] = useState("");

    setInterval(() => {
        const data = new Date();
        const hours = String(data.getHours()).padStart(2, "0");
        const minutes = String(data.getMinutes()).padStart(2, "0");
        const seconds = String(data.getSeconds()).padStart(2, "0");

        setWatch(`${hours}:${minutes}:${seconds}`)
    }, 1000);

    return (
        <div className="watch">
            <h2>{watch}</h2>
        </div>
    )
};

export default Clock;