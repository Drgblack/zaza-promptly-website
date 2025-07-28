import { useFormSubmission } from '../../hooks/useFormSubmission';
import { useState } from 'react';
import { SEOHead } from "@/components/seo-head";

export default function ContactForm() {
  const { submitForm, loading, success, error } = useFormSubmission();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <>
      <SEOHead pageType="contact" />
      <div style={{ padding: 32, textAlign: 'center' }}>
        <h1>Contact</h1>
        <form
          style={{ margin: '24px auto', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 8 }}
          onSubmit={e => {
            e.preventDefault();
            submitForm({ name, email, message }, 'contact');
          }}
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ padding: 8, borderRadius: 4 }}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: 8, borderRadius: 4 }}
          />
          <textarea
            name="message"
            required
            placeholder="Your message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ padding: 8, borderRadius: 4 }}
          />
          <button type="submit" disabled={loading} style={{ background: '#7c3aed', color: 'white', padding: 8, borderRadius: 4 }}>
            {loading ? 'Sending...' : 'Send'}
          </button>
          {success && <p style={{ color: 'limegreen' }}>Thanks, we'll be in touch!</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <p style={{ marginTop: 24 }}>Or use the main Zaza Technologies contact page:</p>
        <a href="https://zazatechnologies.com/contact" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
          Go to Contact
        </a>
      </div>
    </>
  );
} 