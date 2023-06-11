const Home = () => {
    return (
        <>
            <h1>Library Home</h1>
            <p>
                Welcome to LocalLibrary, a website developed by
                <em style={{ fontSize: '20px' }}>&nbsp;KSU SOFTWARE KIM TAE HYUN</em>!
            </p>
            <h2>Dynamic content</h2>
            <p>The library has the following record counts:</p>
            <ul>
                <li>
                    <strong>Books:</strong> 0
                </li>
                <li>
                    <strong>Copies:</strong> 0
                </li>
                <li>
                    <strong>Copies available:</strong> 0
                </li>
                <li>
                    <strong>Authors:</strong> 0
                </li>
            </ul>
        </>
    );
};

export default Home;
