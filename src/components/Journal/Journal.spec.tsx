import { fireEvent, render, waitFor } from '@testing-library/react'
import { Journal } from '../../domain/types/Journal'
import { JournalPage } from './Journal'

describe('JournalPage', () => {
  const user = { displayName: 'Albert', uid: '123' }
  const journals: Journal[] = [
    {
      text: 'this is my journal',
      date: new Date(),
      moonPhase: 'full',
      id: '1',
      userId: '12',
    },
  ]
  const emptyJournal: Journal[] = []
  const moonPhase: string = 'full moon'
  
  const mockUpdateJournals = jest.fn().mockImplementation((journals, newJournal) => {
    return [...journals, newJournal]
  })

  jest.mock('../../domain/data/journals', () => {
    const originalModule = jest.requireActual('../../domain/data/journals')

    return {
      __esModule: true,
      ...originalModule,
      createNewJournal: jest.fn(() => 'created new journal'),
    }
  })

  it('should render header journals for signed in user with journal entries', () => {
    const { getByText } = render(
      <JournalPage
        user={user}
        journals={journals}
        currentMoonPhase={moonPhase}
        updateJournals={mockUpdateJournals}
      />
    )

    expect(
      getByText(`${user.displayName}'s Moon Journal 🌙`)
    ).toBeInTheDocument()
    expect(getByText(journals[0].text)).toBeInTheDocument()
  })

  it('should render no journals message for signed in users with zerio journal entries', () => {
    const { getByText } = render(
      <JournalPage
        user={user}
        journals={emptyJournal}
        currentMoonPhase={moonPhase}
        updateJournals={mockUpdateJournals}
      />
    )

    expect(
      getByText(
        'You do not have any journal entries. Create your first journal entry here!'
      )
    ).toBeInTheDocument()
  })

  it('should render correct message for logged out user', () => {
    const { getByText } = render(
      <JournalPage
        user={null}
        journals={emptyJournal}
        currentMoonPhase={moonPhase}
        updateJournals={mockUpdateJournals}
      />
    )

    expect(getByText('Login to create a journal entry.')).toBeInTheDocument()
  })

  it('should open modal when create new entry button is clicked and close when X button is clicked', () => {
    const { getByText, getByRole } = render(
      <JournalPage
        user={user}
        journals={journals}
        currentMoonPhase={moonPhase}
        updateJournals={mockUpdateJournals}
      />
    )

    expect(getByText('New Journal Entry')).not.toBeVisible()

    const newEntryButton = getByRole('button', { name: 'New Entry' })
    fireEvent.click(newEntryButton)

    expect(getByText('New Journal Entry')).toBeVisible()

    const closeButton = getByText('+')
    fireEvent.click(closeButton)

    expect(getByText('New Journal Entry')).not.toBeVisible()
  })

  it('should add new journal and close modal when submit button is pressed', async () => {
    const { getByText, getByRole, findByText } = render(
      <JournalPage
        user={user}
        journals={journals}
        currentMoonPhase={moonPhase}
        updateJournals={mockUpdateJournals}
      />
    )
    const journalText = 'this is my newest journal entry'

    expect(getByText('New Journal Entry')).not.toBeVisible()

    const newEntryButton = getByRole('button', { name: 'New Entry' })
    fireEvent.click(newEntryButton)

    expect(getByText('New Journal Entry')).toBeVisible()

    const inputBox = getByRole('textbox')
    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(inputBox)
    fireEvent.change(inputBox, { target: { value: journalText } })
    fireEvent.click(submitButton)

    await waitFor(async () => {
      expect(await findByText('New Journal Entry')).not.toBeVisible()
      expect(await findByText(journalText)).toBeInTheDocument()
    })
  })
})
