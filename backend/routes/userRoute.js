import express from 'express';
import userModel from '../models/userModel';

const router = express.Router();

//router pra register
router.post('/register', async (req, res) => {
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const newUser = await user.save();

    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        });
    } else {
        res.status(401).send({msg: 'Invalid User Data'});
    }
})


//router pra sign
router.post('/signin', async (req, res) => {
    
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(user)
        });
    } else {
        res.status(401).send({msg: 'Invalid Email or Password'});
    }
})


//router cria static banco de dados
router.get("/createadmin", async (req, res) => {
    
    try{

        const user = new userModel({
            name: 'jao',
            email: 'jaoo@teste.com',
            password: '1234',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser); 

    }catch(err){
        res.send({msg: err.message});
    }
    

});

export default router;