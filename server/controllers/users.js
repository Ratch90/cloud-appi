const User = require('../models/User');
const Address = require('../models/Address');


const getUsers = async (req,res) => {
    
    let newUsers = [];

   try {
       const users = await User.find();

       for (let i = 0; i < users.length; i++) {
           let newUser = users[i];
           const userAddress = await Address.findById(newUser.address);
           newUser.address = userAddress;
           newUsers.push(newUser);
       }
       res.status(200).json(newUsers);

   } catch (error) {
       res.status(404).json({message : error.message})
   }
    
}

const getUser = async (req,res) => {

    const Id = req.params.userId;
    
    try {
        let user = {};
        user = await User.findOne({id : Id}, async (err,result) => {
            if (!result) {
                res.status(404).json('User not found');
            }
            else {
                const userAddress = await Address.findById(user.address);
                user.address = userAddress;
                res.status(200).json(user);
            }
        });
               
    } catch (error) {
        
        res.status(400).json({message : 'Bad request'});
       
    }
}

const postUser = async (req,res) => {
    
    let currentAddress = {};
    let countries = ['ES','US','UK','DE'];
    
    
    const addressToSave = new Address({
        id : req.body.address.id,
        street : req.body.address.street,
        city : req.body.address.city,
        country : req.body.address.country,
        postalcode : req.body.address.postalcode
    });

    
    try {

        if ( (!typeof addressToSave.id == Number) || (!countries.includes(addressToSave.country)) ) {
            throw new Error('Bad input');
        }
        await addressToSave.save();
        currentAddress = await Address.findOne({id : addressToSave.id});
        
    } catch (error) {
        res.status(404).json(error);
    }

    

    const newUser = new User({
        id : req.body.id,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        birthDate : req.body.birthDate,
        address : currentAddress
      });

    try {
        
        if ( (!typeof newUser.id == Number) || (!typeof newUser.firstname == String) || (!typeof newUser.lastname == String) || (!typeof newUser.email == String) || (!typeof newUser.birthDate == String)) {
            res.status(405).json('Invalid input');
        }
        else {
            await newUser.save();
            res.status(201).json(newUser);
            
        }
        

    } catch (error) {
        res.status(405).json(error);
    }

    
}

const deleteUser = async (req,res) => {

    const Id = req.params.userId;
    let removedUser = {};

    try {
       
        const ifExists = await User.findOne({id : Id}, async (error,result) => {
            if (!result) {
                res.status(404).json("User not found");
            }
            else {
                removedUser = await User.deleteOne({id : Id})
                res.status(200).json('User removed');
            }
        });
      
    } catch (error) {
                
        res.status(400).json("Bad request")
        
    }
   

}

const updateUser = async(req,res) => {

    let currentAddress = {};
    let removedUser = {};

    const Id = req.params.userId;

    const addressToSave = new Address({
        id : req.body.address.id,
        street : req.body.address.street,
        city : req.body.address.city,
        country : req.body.address.country,
        postalcode : req.body.address.postalcode
    });

    await addressToSave.save();
    currentAddress = await Address.findById(addressToSave._id);

    const newUser = new User({
        id : req.body.id,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        birthDate : req.body.birthDate,
        address : currentAddress
      });

    try {
       
        const ifExists = await User.findOne({id : Id}, async (error,result) => {
            if (!result) {
                res.status(404).json("User not found");
            }
            else {
                removedUser = await User.deleteOne({id : Id});

                if ( (!typeof newUser.id == Number) || (!typeof newUser.firstname == String) || (!typeof newUser.lastname == String) || (!typeof newUser.email == String) || (!typeof newUser.birthDate == String)) {
                    res.status(405).json('Invalid input');
                }
                else {
                    await newUser.save();
                    res.status(200).json('OK');
                    
                }
            }
        });
          

    } catch (error) {
        res.status(400).json('Bad request');
    }

}


module.exports = {
    getUsers : getUsers,
    getUser : getUser,
    postUser : postUser,
    deleteUser : deleteUser,
    updateUser : updateUser
}