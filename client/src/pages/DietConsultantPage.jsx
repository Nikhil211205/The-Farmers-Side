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
  goalWeight: '',
  activityLevel: '',
  dietPreference: '',
  foodPreferences: '',
  allergies: '',
  currentEatingHabits: '',
  fitnessLevel: '',
  dailyRoutine: '',
  mainGoal: '',
  additionalInformation: '',
  consultationPreference: '',
  preferredDate: '',
  preferredTime: '',
};

function DietConsultantPage() {
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
      await apiRequest('/diet-consultations', {
        method: 'POST',
        body: {
          ...formData,
          age: formData.age ? Number(formData.age) : undefined,
          heightCm: formData.heightCm ? Number(formData.heightCm) : undefined,
          weightKg: formData.weightKg ? Number(formData.weightKg) : undefined,
          goalWeight: formData.goalWeight ? Number(formData.goalWeight) : undefined,
        },
      });

      setSuccessMessage('Your consultation request has been saved successfully.');
      setFormData(initialValues);
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit consultation request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container page-section">
      <section className="consultation-hero">
        <div>
          <p className="eyebrow eyebrow-dark">Diet consultant</p>
          <h1>Personalized Nutrition For A Healthier You</h1>
          <p>
            Register for thoughtful, non-diagnostic guidance to build a more balanced relationship with food, activity, and lifestyle.
          </p>
        </div>
      </section>

      <div className="benefits-grid">
        <div>Weight Management</div>
        <div>Better Nutrition</div>
        <div>Healthy Eating</div>
        <div>Lifestyle Guidance</div>
        <div>Personalized Plans</div>
        <div>Wellness Guidance</div>
      </div>

      <form className="consult-form form-shell" onSubmit={handleSubmit} noValidate>
        <h3>Consultation registration</h3>
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
            <input name="goalWeight" placeholder="Goal Weight" type="number" value={formData.goalWeight} onChange={handleChange} />
          </div>
          <div className="field-group">
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
              <option value="">Activity Level</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="field-group">
            <select name="dietPreference" value={formData.dietPreference} onChange={handleChange}>
              <option value="">Diet Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-vegetarian">Non-vegetarian</option>
            </select>
          </div>
          <div className="field-group">
            <input name="foodPreferences" placeholder="Food preferences" value={formData.foodPreferences} onChange={handleChange} />
          </div>
          <div className="field-group">
            <input name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} />
          </div>
          <div className="field-group">
            <input name="currentEatingHabits" placeholder="Current eating habits" value={formData.currentEatingHabits} onChange={handleChange} />
          </div>
          <div className="field-group">
            <input name="fitnessLevel" placeholder="Fitness level" value={formData.fitnessLevel} onChange={handleChange} />
          </div>
          <div className="field-group">
            <input name="dailyRoutine" placeholder="Daily routine" value={formData.dailyRoutine} onChange={handleChange} />
          </div>
          <div className="field-group">
            <input name="mainGoal" placeholder="Main goal" value={formData.mainGoal} onChange={handleChange} />
          </div>
          <div className="field-group full-span">
            <textarea name="additionalInformation" placeholder="Additional information" rows={4} value={formData.additionalInformation} onChange={handleChange} />
          </div>
          <div className="field-group">
            <select name="consultationPreference" value={formData.consultationPreference} onChange={handleChange}>
              <option value="">Consultation preference</option>
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
            </select>
          </div>
          <div className="field-group">
            <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} />
          </div>
          <div className="field-group">
            <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} />
          </div>
        </div>

        {submitError && <div className="form-message error">{submitError}</div>}
        {successMessage && <div className="form-message success">{successMessage}</div>}

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Book Diet Consultation'}
        </button>
      </form>
    </div>
  );
}

export default DietConsultantPage;
