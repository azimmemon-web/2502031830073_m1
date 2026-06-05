function hello() {

    const getName = (yourname) => {
        return yourname;
    }

    function handleClick() {
        alert("Hello");
    }

    const name = "Yahubaba";
    const name1 = "xyz";

    return (
        <>
            <h1>Hello {getName(name)}</h1>
            <h2>Bye {getName(name1)}</h2>

            <button onClick={handleClick}>
                Click Me
            </button>
        </>
    );
}

export default hello;