const Note = ({ content, important, onClick }) => {
    return (
        <li>
            {content}<button onClick={onClick}>{`Mark as ${important ? 'not important' : 'important'}`}</button>
        </li>
    );
}

export default Note;