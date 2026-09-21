import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const initialValues = {
  name: '',
  mobile: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
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

    if (!formData.mobile.trim()) nextErrors.mobile = 'Mobile number is required.';
    else if (!mobileRegex.test(formData.mobile.trim())) nextErrors.mobile = 'Enter a valid 10-digit mobile number.';

    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    else if (!emailRegex.test(formData.email)) nextErrors.email = 'Enter a valid email address.';

    if (!formData.password) nextErrors.password = 'Password is required.';
    else if (formData.password.length < 6) nextErrors.password = 'Password must be at least 6 characters long.';

    if (!formData.confirmPassword) nextErrors.confirmPassword = 'Confirm password is required.';
    else if (formData.confirmPassword !== formData.password) nextErrors.confirmPassword = 'Passwords do not match.';

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
      await register({
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setSuccessMessage('Registration successful. Redirecting...');
      setTimeout(() => navigate('/'), 700);
    } catch (error) {
      setSubmitError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container page-section auth-page">
      <form className="form-shell auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Create account</h1>

        <div className="form-grid">
          <div className="field-group">
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field-group">
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field-group">
            <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} aria-invalid={Boolean(errors.mobile)} />
            {errors.mobile && <span className="field-error">{errors.mobile}</span>}
          </div>

          <div className="field-group">
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} aria-invalid={Boolean(errors.password)} />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="field-group">
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} aria-invalid={Boolean(errors.confirmPassword)} />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>
        </div>

        {submitError && <div className="form-message error">{submitError}</div>}
        {successMessage && <div className="form-message success">{successMessage}</div>}

        <button className="btn btn-primary full-width" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>

        <p className="helper-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
