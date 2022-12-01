import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { Journal } from "../../domain/types/Journal";
import { createNewJournal } from "../../domain/data/journals";
import { v4 as uuidv4 } from "uuid";
import "./journal.scss";
import { JournalPrompt } from "../../domain/types/JournalPrompts";

type JournalProps = {
  journals: Journal[];
  user: any | null;
  currentMoonPhase: string;
  journalPrompt?: JournalPrompt;
  updateJournals: Dispatch<SetStateAction<Journal[]>>;
};

type JournalEntryProps = {
  moonPhase: string;
  date: string;
  text: string;
  prompt?: JournalPrompt;
};

type NewJournalModalProps = {
  isModalOpen: boolean;
  currentMoonPhase: string;
  journalPrompt?: JournalPrompt;
  journalText: string;
  closeModal: () => void;
  handleSubmit: (e: any) => void;
  onChange: (e: any) => void;
};

const JournalEntry: FunctionComponent<JournalEntryProps> = (
  props: JournalEntryProps
) => {
  return (
    <div className="journalEntry">
      <p className="titleText journalTitle">
        {props.date}: {props.moonPhase}
      </p>
      {props.prompt ? (
        <p className="text journalPrompt">{props.prompt}</p>
      ) : null}
      <p className="text">{props.text}</p>
    </div>
  );
};

const NewJournalModal: FunctionComponent<NewJournalModalProps> = (
  props: NewJournalModalProps
) => {
  return (
    <div
      className="bgModal"
      style={{ visibility: props.isModalOpen ? "visible" : "hidden" }}
    >
      <div className="modalContent">
        <span className="close" onClick={props.closeModal}>
          +
        </span>
        <div className="modalHeader">
          <span className="titleText">New Journal Entry</span>
          <span className="text">{props.journalPrompt}</span>
        </div>
        <div>
          <textarea
            name="journalText"
            value={props.journalText}
            autoFocus
            placeholder="What's on your mind..."
            onChange={(e) => props.onChange(e.target.value)}
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
  );
};

export const JournalPage: FunctionComponent<JournalProps> = (
  props: JournalProps
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJournalText, setNewJournalText] = useState("");

  const handleSubmit = async () => {
    const newJournal: Journal = {
      date: new Date(),
      moonPhase: props.currentMoonPhase,
      text: newJournalText,
      userId: props.user.uid,
      id: uuidv4(),
      journalPrompt: props.journalPrompt,
    };

    await createNewJournal(newJournal);
    props.updateJournals([...props.journals, newJournal]);
    setNewJournalText("");
    setIsModalOpen(false);
  };

  if (!props.user) {
    return (
      <div className="textContainer">
        <p className="text">Login to create a journal entry.</p>
      </div>
    );
  }

  return (
    <div className="journalPageContainer">
      <NewJournalModal
        isModalOpen={isModalOpen}
        closeModal={() => {
          setNewJournalText("");
          setIsModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        currentMoonPhase={props.currentMoonPhase}
        journalPrompt={props.journalPrompt}
        journalText={newJournalText}
        onChange={setNewJournalText}
      />
      <div className="journalPageContent">
        <div className="titleText journalHeader">
          <span>{props.user.displayName}'s Moon Journal</span>
          <button className="text" onClick={() => setIsModalOpen(true)}>
            New Entry
          </button>
        </div>
        <div className="journalsContainer">
          {props.journals.length ? (
            props.journals.map((journal) => {
              return (
                <JournalEntry
                  key={journal.id}
                  date={journal.date.toLocaleString()}
                  text={journal.text}
                  moonPhase={journal.moonPhase}
                  prompt={journal.journalPrompt}
                />
              );
            })
          ) : (
            <p className="text">
              You do not have any journal entries. Create your first journal
              entry now!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
