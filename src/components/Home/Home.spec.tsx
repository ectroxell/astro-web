import { fireEvent, render, screen } from "@testing-library/react";
import { JournalPrompt } from "../../domain/data/journal-prompts";
import { MoonPhase } from "../../domain/data/moon-phase";
import { Home } from "./Home";

describe("Home", () => {
  const mockUser = { displayName: "Alfred" };
  const mockMoonData = {
    illuminated: 38,
    phase: MoonPhase.FullMoon,
    journalPrompt: JournalPrompt.FullMoon,
    keywords: "celebrate",
    shortDescription: "time to reflect",
  };
  it("should render", async () => {
    render(<Home moonData={mockMoonData} user={mockUser} />);

    expect(await screen.findByText("Welcome to Moonology")).toBeInTheDocument();
  });

  it("should display moon data when logged out", async () => {
    render(<Home moonData={mockMoonData} user={null} />);

    expect(
      await screen.findByText(
        `The moon is ${mockMoonData.illuminated}% illuminated and in the ${mockMoonData.phase} phase.`
      )
    ).toBeInTheDocument();
  });

  it("should hide sign up form after account is created", async () => {
    render(<Home moonData={mockMoonData} user={null} />);

    const signUpButton = screen.getByRole("button", { name: "Sign Up" });
    fireEvent.click(signUpButton);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const nameInput = screen.getByTestId("displayName");
    const createAccountButton = screen.getByRole("button", {name: "Create Account"});

    fireEvent.click(emailInput);
    fireEvent.change(emailInput, {target: {value: "email@email.com"}});

    fireEvent.click(passwordInput);
    fireEvent.change(passwordInput, {target: {value: "password123"}});

    fireEvent.click(nameInput);
    fireEvent.change(nameInput, {target: {value: "Delilah"}});

    fireEvent.click(createAccountButton);
    expect(createAccountButton).not.toBeVisible();
  });
});
