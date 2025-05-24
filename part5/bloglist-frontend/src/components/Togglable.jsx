import { useState } from 'react'

const Togglable = (props) => {
    const [visibleNoteForm, setVisibleNoteForm] = useState(false)

    const showNewNoteForm = {display: visibleNoteForm ? '' : 'none'}
    const hideNewNoteForm = {display: visibleNoteForm ? 'none' : ''}

    return (
        <>
            <div style={showNewNoteForm}>
                <h2>create new</h2>
                {props.children}
                <button onClick={() => setVisibleNoteForm(false)}>cancel</button>
            </div>
            <div style={hideNewNoteForm}>
                <button onClick={() => setVisibleNoteForm(true)}>new note</button>
            </div>
        </>
    )
}

export default Togglable