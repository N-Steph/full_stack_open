import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visibleNoteForm, setVisibleNoteForm] = useState(false)

    const showNewNoteForm = {display: visibleNoteForm ? '' : 'none'}
    const hideNewNoteForm = {display: visibleNoteForm ? 'none' : ''}

    const toggleVisibility = () => {
        setVisibleNoteForm(!visibleNoteForm)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={showNewNoteForm}>
                <h2>create new</h2>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
            <div style={hideNewNoteForm}>
                <button onClick={toggleVisibility}>new note</button>
            </div>
        </>
    )
})

export default Togglable