import mongoose from 'mongoose';

const fitnessProgramSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    age: { type: Number },
    gender: { type: String },
    heightCm: { type: Number },
    weightKg: { type: Number },
    fitnessGoal: { type: String },
    currentFitnessLevel: { type: String },
    workoutType: { type: String },
    workoutFrequency: { type: String },
    availableWorkoutTime: { type: String },
    preferredConsultationMode: { type: String },
    additionalInformation: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.FitnessProgram || mongoose.model('FitnessProgram', fitnessProgramSchema);
