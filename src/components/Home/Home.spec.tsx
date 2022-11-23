import { render, screen } from "@testing-library/react";
import { JournalPrompt } from "../../domain/data/journal-prompts";
import { MoonPhase } from "../../domain/data/moon-phase";
import { Home } from "./Home";

describe("Home", () => {
  const mockUser = { displayName: "Alfred" };
  const mockMoonData = { illuminated: 38, phase: MoonPhase.FullMoon, journalPrompt: JournalPrompt.FullMoon };
  it("should render", async () => {
    render(<Home moonData={mockMoonData} user={mockUser} />);

    expect(await screen.findByText("Welcome to Moonology")).toBeInTheDocument();
  });

  it("should display moon data when logged out", async () => {
    render(<Home moonData={mockMoonData} user={null} />);

    expect(await screen.findByText(`The moon is ${mockMoonData.illuminated}% illuminated and in the ${mockMoonData.phase} phase.`)).toBeInTheDocument();
  })
});
