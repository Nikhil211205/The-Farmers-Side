import { useState } from 'react';
import { apiRequest } from '../api';

const initialValues = {
  name: '',
  email: '',
  mobile: '',
  subject: '',
  message: '',
};

function ContactPage() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) nextErrors.name = 'Name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    else if (!emailRegex.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formData.mobile.trim()) nextErrors.mobile = 'Mobile number is required.';
    else if (!mobileRegex.test(formData.mobile.trim())) nextErrors.mobile = 'Enter a valid 10-digit mobile number.';
    if (!formData.message.trim()) nextErrors.message = 'Message is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');
    setSuccessMessage('');

    try {
      await apiRequest('/contact', {
        method: 'POST',
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.mobile.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
      });

      setSuccessMessage('Your message has been sent successfully.');
      setFormData(initialValues);
    } catch (error) {
      setSubmitError(error.message || 'Unable to send message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container page-section contact-page">
      <div className="section-heading">
        <p className="eyebrow eyebrow-dark">Contact us</p>
        <h1>We’d love to hear from you</h1>
      </div>

      <div className="contact-layout">
        <form className="form-shell" onSubmit={handleSubmit} noValidate>
          <div className="form-grid two-col">
            <div className="field-group">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="field-group">
              <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="field-group">
              <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} aria-invalid={Boolean(errors.mobile)} />
              {errors.mobile && <span className="field-error">{errors.mobile}</span>}
            </div>
            <div className="field-group">
              <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="field-group full-span">
              <textarea name="message" placeholder="Message" rows={5} value={formData.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>
          </div>

          {submitError && <div className="form-message error">{submitError}</div>}
          {successMessage && <div className="form-message success">{successMessage}</div>}

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
        </form>

        <aside className="contact-info card-shell">
          <h3>Contact information</h3>
          <p>Email: hello@thefarmersside.com</p>
          <p>Phone: +91 9003967445</p>
          <p>Address: Grove Paddles, 2/124-A, Thottatu Salai East, Puttuvikki Road, Perur, Tamil Nadu - 641010.</p>
          <p>Business hours: Mon-Sat, 9:00 AM - 6:00 PM</p>
          <div className="map-placeholder">Map placeholder</div>
        </aside>
      </div>
    </div>
  );
}

export default ContactPage;
