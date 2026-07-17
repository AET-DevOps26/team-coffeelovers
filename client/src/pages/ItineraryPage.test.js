import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ItineraryPage from './ItineraryPage';

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
  TileLayer: () => null,
}));
jest.mock('leaflet/dist/leaflet.css', () => {});

const mockItinerary = {
  itinerary: [{
    day: 1,
    title: 'Explore the city',
    activities: [
      { title: 'Visit the museum', description: 'A great museum', estimatedDuration: '2 hours' },
    ],
  }],
};

const setupFetch = ({ ownerUserId = 999, authorUsername = 'alice' } = {}) => {
  global.fetch = jest.fn((url) => {
    if (typeof url === 'string' && url.includes('nominatim')) {
      return Promise.resolve({ json: () => Promise.resolve([]) });
    }
    if (typeof url === 'string' && url.includes('/itinerary')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockItinerary) });
    }
    if (typeof url === 'string' && url.includes('/generate')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockItinerary) });
    }
    // trip metadata
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ userId: ownerUserId, authorUsername }),
    });
  });
};

const renderPage = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ---------------------------------------------------------------------------
describe('ItineraryPage — shared-trip banner', () => {
  test('logged-out visitor sees "Log in to save" banner on shared link', async () => {
    setupFetch();
    renderPage('/itinerary?destination=Paris&tripId=123&preference=popular');

    expect(
      await screen.findByText(/This plan was shared with you — log in to save it to your account/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in to save/i })).toBeInTheDocument();
  });

  test('logged-in non-owner sees "Shared by" banner with Save to My Plans button', async () => {
    localStorage.setItem('userId', '42');
    localStorage.setItem('token', 'fake-token');
    setupFetch({ ownerUserId: 999 }); // trip owner is 999, logged in as 42
    renderPage('/itinerary?destination=Paris&tripId=123&preference=popular');

    // Wait for the "Save to My Plans" button — it only renders after metadata resolves
    await screen.findByRole('button', { name: /Save to My Plans/i });
    // Verify the username "alice" appears inside the banner's <strong>
    expect(screen.getByText('alice')).toBeInTheDocument();
  });

  test('Delete/Save/Share buttons are hidden for non-owner', async () => {
    localStorage.setItem('userId', '42');
    localStorage.setItem('token', 'fake-token');
    setupFetch({ ownerUserId: 999 });
    renderPage('/itinerary?destination=Paris&tripId=123&preference=popular');

    // Wait for metadata fetch to resolve (banner becomes visible)
    await screen.findByRole('button', { name: /Save to My Plans/i });

    expect(screen.queryByRole('button', { name: /Delete Plan/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Save Plan/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Share Plan/i })).not.toBeInTheDocument();
  });

  test('owner sees no banner and has Delete and Share buttons', async () => {
    localStorage.setItem('userId', '999');
    localStorage.setItem('token', 'fake-token');
    setupFetch({ ownerUserId: 999 });
    renderPage('/itinerary?destination=Paris&tripId=123&preference=popular');

    // Wait for metadata fetch to resolve and activate the trip for the owner
    await screen.findByRole('button', { name: /Delete Plan/i });

    expect(screen.queryByText(/Shared by/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/log in to save/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Share Plan/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
describe('ItineraryPage — Share Plan button state', () => {
  test('Share Plan is disabled for a new unsaved itinerary', async () => {
    localStorage.setItem('userId', '42');
    localStorage.setItem('token', 'fake-token');
    setupFetch();
    // No tripId → generates a new plan; activeTripId stays null
    renderPage('/itinerary?destination=Paris&preference=popular');

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Share Plan/i })).toBeInTheDocument()
    );
    expect(screen.getByRole('button', { name: /Share Plan/i })).toBeDisabled();
  });
});
