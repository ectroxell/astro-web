import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { JournalPrompt } from "../../domain/types/JournalPrompts";
import { MoonPhase } from "../../domain/types/MoonPhases";
import { Journal } from "../../domain/types/Journal";
import { JournalPage } from "./Journal";

describe("JournalPage", () => {
  const user = { displayName: "Albert", uid: "123" };
  const journals: Journal[] = [
    {
      text: "this is my journal",
      date: new Date(),
      moonPhase: "full",
      id: "1",
      userId: "12",
    },
    {
      text: "this is my journal with a prompt",
      date: new Date(),
      moonPhase: "full",
      id: "2",
      userId: "123",
      journalPrompt: JournalPrompt.FullMoon,
    },
  ];
  const emptyJournal: Journal[] = [];
  const moonPhase: MoonPhase = MoonPhase.FullMoon;

  const mockUpdateJournals = jest
    .fn()
    .mockImplementation((journals, newJournal) => {
      return [...journals, newJournal];
    });

  jest.mock("../../domain/data/journals", () => {
    const originalModule = jest.requireActual("../../domain/data/journals");

    return {
      __esModule: true,
      ...originalModule,
      createNewJournal: jest.fn(() => "created new journal"),
    };
  });

  it("should render header for signed in user with journal entries", () => {
    render(
      <JournalPage
        user={user}
        journals={journals}
        currentMoonPhase={moonPhase}
        updateJournals={mockUpdateJournals}
      />
    );

    expect(
      screen.getByText(`${user.displayName}'s Moon Journal`)
    ).toBeInTheDocument();
    expect(screen.getByText(journals[0].text)).toBeInTheDocument();
  });

  it("should render no journals message for signed in users with zerio journal entries", () => {
    render(
      <JournalPage
        user={user}
        journals={emptyJournal}
        currentMoonPhase={moonPhase}
        updateJournals={mockUpdateJournals}
      />
    );

    expect(
      screen.getByText(
        "You do not have any journal entries. Create your first journal entry now!"
      )
    ).toBeInTheDocument();
  });

  it("should render correct message for logged out user", () => {
    render(
      <JournalPage
        user={null}
        journals={emptyJournal}
        currentMoonPhase={moonPhase}
        updateJournals={mockUpdateJournals}
      />
    );

    expect(
      screen.getByText("Login to create a journal entry.")
    ).toBeInTheDocument();
  });

  it("should render journal prompt if not null", () => {
    render(
      <JournalPage
        user={user}
        journals={journals}
        currentMoonPhase={moonPhase}
        updateJournals={mockUpdateJournals}
      />
    );

    expect(screen.getByText(JournalPrompt.FullMoon)).toBeInTheDocument();
  });

  describe("New Entry Modal", () => {
    it("should open modal when create new entry button is clicked and close when X button is clicked", () => {
      render(
        <JournalPage
          user={user}
          journals={journals}
          currentMoonPhase={moonPhase}
          updateJournals={mockUpdateJournals}
        />
      );

      expect(screen.getByText("New Journal Entry")).not.toBeVisible();

      const newEntryButton = screen.getByRole("button", { name: "New Entry" });
      fireEvent.click(newEntryButton);

      expect(screen.getByText("New Journal Entry")).toBeVisible();

      const closeButton = screen.getByText("+");
      fireEvent.click(closeButton);

      expect(screen.getByText("New Journal Entry")).not.toBeVisible();
    });

    it("should show journal prompt based on current moon phase", () => {
      render(
        <JournalPage
          user={user}
          journals={journals}
          currentMoonPhase={moonPhase}
          updateJournals={mockUpdateJournals}
          journalPrompt={JournalPrompt.FirstQuarter}
        />
      );

      const newEntryButton = screen.getByRole("button", { name: "New Entry" });
      fireEvent.click(newEntryButton);

      expect(screen.getByText(JournalPrompt.FirstQuarter)).toBeInTheDocument();
    });

    it("should clear journal entry text on close", () => {
      render(
        <JournalPage
          user={user}
          journals={journals}
          currentMoonPhase={moonPhase}
          updateJournals={mockUpdateJournals}
          journalPrompt={JournalPrompt.FirstQuarter}
        />
      );
      const journalText = "this is my newest journal entry";

      const newEntryButton = screen.getByRole("button", { name: "New Entry" });
      fireEvent.click(newEntryButton);

      const inputBox = screen.getByRole("textbox");
      fireEvent.click(inputBox);
      fireEvent.change(inputBox, { target: { value: journalText } });

      const closeButton = screen.getByText("+");
      fireEvent.click(closeButton);

      fireEvent.click(newEntryButton);

      expect(screen.queryByDisplayValue(journalText)).not.toBeInTheDocument();
    });

    it.skip("should add new journal and close modal when submit button is pressed", async () => {
      render(
        <JournalPage
          user={user}
          journals={journals}
          currentMoonPhase={moonPhase}
          updateJournals={mockUpdateJournals}
        />
      );
      const journalText = "this is my newest journal entry";

      expect(screen.getByText("New Journal Entry")).not.toBeVisible();

      const newEntryButton = screen.getByRole("button", { name: "New Entry" });
      fireEvent.click(newEntryButton);

      expect(screen.getByText("New Journal Entry")).toBeVisible();

      const inputBox = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button", { name: "Submit" });
      fireEvent.click(inputBox);
      fireEvent.change(inputBox, { target: { value: journalText } });
      fireEvent.click(submitButton);

      await waitFor(async () => {
        expect(await screen.findByText("New Journal Entry")).not.toBeVisible();
      });
      expect(await screen.findByText(journalText)).toBeInTheDocument();
    });
  });
});
