import mongoose from 'mongoose';
const {ObjectId}=mongoose.Schema

const CertificateRequestSchema = new mongoose.Schema({
    student_id: {
        type:ObjectId,
        required: true,
        ref: 'User'
    },
    course_name: {
        type: String, 
        required: true
    }
})

export const CertificateRequest = mongoose.model('CertificateRequest', CertificateRequestSchema)