import { render } from '@testing-library/react'
import { Home } from './Home'

describe('Home', () => {
  const mockUser = { displayName: 'Alfred' }
  const mockMoonData = { illuminated: 38, phase: 'full' }
  it('should render', async () => {
    const { findByText } = render(
      <Home moonData={mockMoonData} user={mockUser} />
    )

    expect(await findByText('Welcome to Moonology')).toBeInTheDocument()
  })
})
