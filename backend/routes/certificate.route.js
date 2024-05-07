import { Router } from 'express'
import { CertificateRequest } from '../models/certificateRequest.model.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { Certificate } from '../models/certificate.model.js';
import { fillPDF } from '../utils/certificateMaker.js';
const router = Router()
import dotenv from 'dotenv'
dotenv.config()

import {google} from 'googleapis'
import path from 'path'
import fs from 'fs'
import { uploadFile } from '../utils/drive.js';

const __dirname = path.resolve();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'output.pdf')

router.use(isAuthenticated)

router.get('/made/all', async(req, res)=> {
    try {
        const certificates = await Certificate.find({})
        return res.json({status: true, data: certificates})
    } catch (error) {
        return res.json({message: error.message, status: false})
    }
})

router.get('/made/forUser', async(req, res)=> {
    try {
        const user = req.user;
        const role = user.role;
        if(role === 'admin') throw new Error('You are not authorized to access this route')
        const certificates = await Certificate.find({student_email: req.user.email})
        return res.json({status: true, data: certificates})
    } catch (error) {
        return res.json({message: error.message, status: false})
    }
})


router.get('/requested/all', async(req, res)=> {
    try {
        const user = req.user;
        const role = user.role;
        if(role === 'user') throw new Error('You are not authorized to access this route')
        const certicates = await CertificateRequest.find({})
        return res.json({status: true, data: certicates})
    } catch (error) {
        return res.json({message: error.message, status: false})
    }
})

router.post('/createRequest', async(req, res)=>{
    try {
        // console.log('hi')
        const user = req.user;
        // console.log(req.body)
        const {course_name} = req.body
        const newCertificateRequest = await CertificateRequest.create({
            student_id: user._id,
            course_name: course_name
        })
        return res.json({message: 'New Certificate Request created', data: newCertificateRequest, status: true})
    } catch (error) {
        console.log(error.message)
        return res.json({status: false, message: error.message})
    }
})


router.post('/isAlreadyRequested', async (req, res) => {
    try {
        const user = req.user;
        const { course_name } = req.body; // Accessing parameters from query string
        // console.log(course_name)
        const certificatesRequested = await CertificateRequest.find({ student_id: user._id, course_name: course_name });
        // You can handle the response based on whether certificatesRequested array is empty or not
        if (certificatesRequested.length > 0) {
            res.status(200).json({ alreadyRequested: true });
        } else {
            res.status(200).json({ alreadyRequested: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/approveAndCreate', async(req, res)=>{
    try {
        const {course_name, student_name, course_completed, student_email} = req.body
        // console.log(req.body)
        const newCertificate = await Certificate.create({
            student_email: student_email,
            course_name: course_name
        })

        const certificate_id = newCertificate._id;
        const pdfName = String(student_name).replace(/ /g, '_') + `_` + String(course_name).replace(/ /g, '_') + 'Course_Certificate.pdf'
        fillPDF('TDC.pdf', 'output.pdf', String(student_name), String(course_name), String(course_completed), String(certificate_id))

        const data = await uploadFile(pdfName)

        newCertificate.certificate_view_link = data.data.webViewLink
        newCertificate.certificate_download_link = data.data.webContentLink
        newCertificate.certificate_thubmnail_link = data.data.thumbnailLink
        await newCertificate.save()

        return res.json({message: 'drive link of course certificate', data: data})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async(req, res)=>{
    try {
        const id = req.params.id
        await CertificateRequest.deleteOne({_id: id})
        return res.json({status: true, message: 'Certificate Request deleted successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


export default router;