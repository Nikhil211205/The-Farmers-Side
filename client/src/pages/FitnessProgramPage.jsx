import { useState } from 'react';
import { apiRequest } from '../api';

const initialValues = {
  fullName: '',
  email: '',
  mobileNumber: '',
  age: '',
  gender: '',
  heightCm: '',
  weightKg: '',
  fitnessGoal: '',
  currentFitnessLevel: '',
  workoutType: '',
  workoutFrequency: '',
  availableWorkoutTime: '',
  preferredConsultationMode: '',
  additionalInformation: '',
};

function FitnessProgramPage() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    else if (!emailRegex.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formData.mobileNumber.trim()) nextErrors.mobileNumber = 'Mobile number is required.';
    else if (!mobileRegex.test(formData.mobileNumber.trim())) nextErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';

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
      await apiRequest('/fitness-programs', {
        method: 'POST',
        body: {
          ...formData,
          age: formData.age ? Number(formData.age) : undefined,
          heightCm: formData.heightCm ? Number(formData.heightCm) : undefined,
          weightKg: formData.weightKg ? Number(formData.weightKg) : undefined,
        },
      });

      setSuccessMessage('Your fitness program registration has been saved successfully.');
      setFormData(initialValues);
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit fitness program registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container page-section">
      <section className="consultation-hero">
        <div>
          <p className="eyebrow eyebrow-dark">Fitness program</p>
          <h1>Stronger Body. Healthier Mind.</h1>
          <p>
            Personalized training plans designed to support sustainable progress and long-term wellness.
          </p>
        </div>
      </section>

      <div className="benefits-grid">
        <div>Personalized Plans</div>
        <div>Expert Trainers</div>
        <div>Flexible Schedule</div>
        <div>Progress Tracking</div>
        <div>Lifestyle Guidance</div>
        <div>Long-Term Wellness</div>
      </div>

      <form className="consult-form form-shell" onSubmit={handleSubmit} noValidate>
        <h3>Join fitness program</h3>
        <div className="form-grid two-col">
          <div className="field-group">
            <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} aria-invalid={Boolean(errors.fullName)} />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>
          <div className="field-group">
            <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="field-group">
            <input name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} aria-invalid={Boolean(errors.mobileNumber)} />
            {errors.mobileNumber && <span className="field-error">{errors.mobileNumber}</span>}
          </div>
          <div className="field-group">
            <input name="age" placeholder="Age" type="number" value={formData.age} onChange={handleChange} />
          </div>
          <div className="field-group">
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="field-group">
            <input name="heightCm" placeholder="Height (cm)" type="number" value={formData.heightCm} onChange={handleChange} />
          </div>
          <div className="field-group">
            <input name="weightKg" placeholder="Weight (kg)" type="number" value={formData.weightKg} onChange={handleChange} />
          </div>
          <div className="field-group">
            <input name="fitnessGoal" placeholder="Fitness Goal" value={formData.fitnessGoal} onChange={handleChange} />
          </div>
          <div className="field-group">
            <select name="currentFitnessLevel" value={formData.currentFitnessLevel} onChange={handleChange}>
              <option value="">Current Fitness Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="field-group">
            <select name="workoutType" value={formData.workoutType} onChange={handleChange}>
              <option value="">Preferred Workout Type</option>
              <option value="Strength">Strength</option>
              <option value="Cardio">Cardio</option>
              <option value="Yoga">Yoga</option>
            </select>
          </div>
          <div className="field-group">
            <select name="workoutFrequency" value={formData.workoutFrequency} onChange={handleChange}>
              <option value="">Workout frequency</option>
              <option value="2 times a week">2 times a week</option>
              <option value="3 times a week">3 times a week</option>
              <option value="5 times a week">5 times a week</option>
            </select>
          </div>
          <div className="field-group">
            <input name="availableWorkoutTime" placeholder="Available workout time" value={formData.availableWorkoutTime} onChange={handleChange} />
          </div>
          <div className="field-group">
            <select name="preferredConsultationMode" value={formData.preferredConsultationMode} onChange={handleChange}>
              <option value="">Preferred consultation mode</option>
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
            </select>
          </div>
          <div className="field-group full-span">
            <textarea name="additionalInformation" placeholder="Additional information" rows={4} value={formData.additionalInformation} onChange={handleChange} />
          </div>
        </div>

        {submitError && <div className="form-message error">{submitError}</div>}
        {successMessage && <div className="form-message success">{successMessage}</div>}

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Joining...' : 'Join Fitness Program'}
        </button>
      </form>
    </div>
  );
}

export default FitnessProgramPage;
