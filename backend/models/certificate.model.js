import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
    certificate_view_link: {
        type: String
    },
    course_name: {
        type: String,
        required: true
    },
    student_email: {
        type: String,
        required: true
    },
    certificate_download_link: {
        type: String,
    },
    certificate_thubmnail_link: {
        type: String,
    }
})

export const Certificate = mongoose.model('Certificate', CertificateSchema)