import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';

const renderPage = () =>
  render(<MemoryRouter><RegisterPage /></MemoryRouter>);

const fillPassword = (password) =>
  userEvent.type(screen.getByLabelText('Password'), password);

const fillConfirm = (password) =>
  userEvent.type(screen.getByLabelText('Confirm Password'), password);

describe('RegisterPage — password validation', () => {
  test('shows mismatch feedback when confirm differs from password', () => {
    renderPage();
    fillPassword('secret123');
    fillConfirm('different');
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  test('shows match feedback when passwords are equal', () => {
    renderPage();
    fillPassword('secret123');
    fillConfirm('secret123');
    expect(screen.getByText(/Passwords match/i)).toBeInTheDocument();
  });

  test('no feedback shown before confirm field is touched', () => {
    renderPage();
    fillPassword('secret123');
    expect(screen.queryByText(/Passwords/i)).not.toBeInTheDocument();
  });

  test('submit button is disabled while passwords do not match', () => {
    renderPage();
    fillPassword('secret123');
    fillConfirm('wrong');
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
  });

  test('submit button is enabled when passwords match', () => {
    renderPage();
    fillPassword('secret123');
    fillConfirm('secret123');
    expect(screen.getByRole('button', { name: /Create Account/i })).not.toBeDisabled();
  });
});

describe('RegisterPage — duplicate account error', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 409,
        json: () => Promise.resolve({}),
      })
    );
  });

  afterEach(() => jest.restoreAllMocks());

  test('shows duplicate account message on 409 response', async () => {
    renderPage();
    userEvent.type(screen.getByLabelText('Username'), 'testuser');
    userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    fillPassword('secret123');
    fillConfirm('secret123');
    userEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(
      await screen.findByText(/An account with this email or username already exists/i)
    ).toBeInTheDocument();
  });
});
