import mongoose from 'mongoose';

const dietConsultationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    age: { type: Number },
    gender: { type: String },
    heightCm: { type: Number },
    weightKg: { type: Number },
    goalWeight: { type: Number },
    activityLevel: { type: String },
    dietPreference: { type: String },
    foodPreferences: { type: String },
    allergies: { type: String },
    currentEatingHabits: { type: String },
    fitnessLevel: { type: String },
    dailyRoutine: { type: String },
    mainGoal: { type: String },
    additionalInformation: { type: String },
    consultationPreference: { type: String },
    preferredDate: { type: String },
    preferredTime: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.DietConsultation || mongoose.model('DietConsultation', dietConsultationSchema);
