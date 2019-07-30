const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res, next) => {
        const db = req.app.get('db');
        let { password, email } = req.body;
        

        const foundUser = await db.select_user(email)
        .catch(err => console.log(err))
        if(!foundUser){
            res.status(200).send({message:`no user found with that email. Please register as a new user`})
        }
        else {
            const matchedPasswords = await bcrypt.compare(password, foundUser[0].password).catch(err => console.log(err));

            if(matchedPasswords){
                req.session.user = {
                    username: foundUser[0].username,
                    user_id: foundUser[0].user_id,
                    email: foundUser[0].email
                }
                res.status(200).send(req.session.user)
            } else {
                res.status(200).send({message:`Incorrect password`})
            }
        }
    },
    register: (req, res, next) => {
        console.log(req.body)
        const {username, password, email, first_name, last_name, picture} = req.body;
        const db = req.app.get('db')

        db.select_user(email).then(([foundUser]) =>{
            if(foundUser){
                res.status(409).send(`that user already exists`);
            }
            else {
                const saltRounds = 12
                bcrypt.genSalt(saltRounds).then(salt => {
                    bcrypt.hash(password, salt).then(hashedPassword => {
                        db.create_user([username, email, hashedPassword]).then(user => {
                            console.log(`this is the user id` , user)
                            db.create_profile([user[0].user_id, first_name, last_name, picture]).then(([user]) => {
                                console.log(user)
                                req.session.user = user;
                                res.status(200).send(req.session.user)
                            })
                        })
                    })
                })
            }
        })
    },
    logout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send([]);
    },
    userSession: (req, res, next) => {
        res.status(200).send(req.session.user)
    }
}