import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import { Journal } from '../../domain/types/Journal'
import { createNewJournal } from '../../domain/data/journals'
import { v4 as uuidv4 } from 'uuid'
import './journal.scss'

type JournalProps = {
  journals: Journal[]
  user: any | null
  currentMoonPhase: string
  updateJournals: Dispatch<SetStateAction<Journal[]>>
}

type JournalEntryProps = {
  moonPhase: string
  date: string
  text: string
}

type NewJournalModalProps = {
  isModalOpen: boolean
  closeModal: () => void
  handleSubmit: (e: any) => void
  onChange: (e: any) => void
}

const JournalEntry: FunctionComponent<JournalEntryProps> = (
  props: JournalEntryProps
) => {
  return (
    <div className="journalEntry">
      <p className="titleText journalTitle">
        {props.date}: {props.moonPhase}
      </p>
      <p className="text">{props.text}</p>
    </div>
  )
}

const NewJournalModal: FunctionComponent<NewJournalModalProps> = (
  props: NewJournalModalProps
) => {
  return (
    <div
      className="bgModal"
      style={{ visibility: props.isModalOpen ? 'visible' : 'hidden' }}
    >
      <div className="modalContent">
        <div className="close" onClick={props.closeModal}>
          +
        </div>
        <div className="titleText">New Journal Entry</div>
        <div>
          <textarea
            name="journalText"
            autoFocus
            placeholder="What's on your mind..."
            onChange={e => props.onChange(e.target.value)}
          />
          <button
            className="text createJournalButton"
            onClick={props.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export const JournalPage: FunctionComponent<JournalProps> = (
  props: JournalProps
) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newJournalText, setNewJournalText] = useState('')

  const handleSubmit = async () => {
    // create journal object
    const newJournal: Journal = {
      date: new Date(),
      moonPhase: props.currentMoonPhase,
      text: newJournalText,
      userId: props.user.uid,
      id: uuidv4(),
    }
    // add to firestore
    await createNewJournal(newJournal)
    // update journals
    props.updateJournals([...props.journals, newJournal])
    // close modal
    setIsModalOpen(false)
  }

  // if no user is signed in, it should show "must sign in to use journal" message
  if (!props.user) {
    return (
      <div className="textContainer">
        <p className="text">Login to create a journal entry.</p>
      </div>
    )
  }

  // if signed in but no journal entries, show 'no journal entries' message
  // if the user has any journal entries, they should be displayed
  return (
    <div className="journalPageContainer">
      <div className="titleText journalHeader">
        <span>{props.user.displayName}'s Moon Journal 🌙</span>
        <button
          className="text newJournalButton"
          onClick={() => setIsModalOpen(true)}
        >
          New Entry
        </button>
      </div>
      <div className="journalsContainer">
        {props.journals.length ? (
          props.journals.map(journal => {
            return (
              <JournalEntry
                key={journal.id}
                date={journal.date.toLocaleString()}
                text={journal.text}
                moonPhase={journal.moonPhase}
              />
            )
          })
        ) : (
          <p className="text">
            You do not have any journal entries. Create your first journal entry
            here!
          </p>
        )}
      </div>
      <NewJournalModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        handleSubmit={handleSubmit}
        onChange={setNewJournalText}
      />
    </div>
  )
}
