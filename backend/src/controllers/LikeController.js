const Dev = require('../models/Dev')

module.exports = {
    async store(req, res){
        const { user } = req.headers
        const { DevId } = req.params
        
        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(DevId)

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exist'})
        } 

        if(targetDev.likes.includes(loggedDev._id)){
            console.log("DEU MATCH!!!")
        }

        loggedDev.likes.push(targetDev._id)
        await loggedDev.save()

        return res.json(loggedDev)
    } 

}