import { useFormSubmission } from '../../hooks/useFormSubmission';
import { useState } from 'react';

export default function FreeResourcesPlaceholder() {
  const { submitForm, loading, success, error } = useFormSubmission();
  const [email, setEmail] = useState('');
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>Free Resources</h1>
      <form
        style={{ margin: '24px auto', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 8 }}
        onSubmit={e => {
          e.preventDefault();
          submitForm({ email }, 'newsletter');
        }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Sign up for updates"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 8, borderRadius: 4 }}
        />
        <button type="submit" disabled={loading} style={{ background: '#7c3aed', color: 'white', padding: 8, borderRadius: 4 }}>
          {loading ? 'Signing up...' : 'Subscribe'}
        </button>
        {success && <p style={{ color: 'limegreen' }}>Thanks, you’re signed up!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>This page is only available on the main Zaza Technologies site.</p>
      <a href="https://zazatechnologies.com/free-resources" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
        Go to Free Resources
      </a>
    </div>
  );
} 