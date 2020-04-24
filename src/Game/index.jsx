const observe = (receive) => {
    const randPos = () => Math.floor(Math.random() * 8);
    setInterval(() => receive(randPos(), randPos()), 1000);
}

export default observe