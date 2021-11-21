const Note = ({ title, body, onClick }) => {
    return (
        <li>
            <p>{title}</p>
            <button onClick={onClick}></button>
        </li>
    );
}

export default Note;