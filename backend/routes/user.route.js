import { Router } from 'express'
import { User } from '../models/user.model.js';
const router = Router()

router.get('/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if(!user) throw new Error('no user found')
        return res.json({data: user, status: true})
    } catch (error) {
        return res.json({message: error.message, status: false})
    }
})

export default router;