import React, { useState } from "react";

const useCounter = ({ initialstate }) => {
    const [count, setCount] = useState(initialstate);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    return [count, { increment, decrement }];
};

const Counter = () => {
    const [myCount, { increment, decrement }] = useCounter({
        initialstate: 0
    });

    return(
        <div>
            <p>{myCount}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};