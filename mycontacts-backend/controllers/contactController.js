const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");
//@desc Get contacts
//@route GET /api/contacts
//@access private

const  getContacts = asyncHandler(async(req,res) => {
    const contact =  await Contact.find({user_id: req.user.id});
    res.status(200).json(contact);
});

//@desc Create New Contact
//@route POST /api/contacts/:id
//@access private


const  createContact = asyncHandler(async(req,res) => {
    const {name,email,phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are Mandatory"); 
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });

    res.status(201).json(contact);
});

//@desc Get contacts
//@route GET /api/contacts/:id
//@access private

const  getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404);
        throw new Error("Contact Not Found"); 
    }
    res.status(200).json(contact);
});


//@desc Update contact 
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async(req,res) => {
        const contact = await Contact.findById(req.params.id)
        if(!contact) {
            res.status(404);
            throw new Error("Contact Not Found"); 
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User don't have permission to update other user contacts ");
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.Id,
            req.body,
            {new:true}
        );
    res.status(200).json(updatedContact);
});


//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access private

const  deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
        if(!contact) {
            res.status(404);
            throw new Error("Contact Not Found"); 
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User don't have permission to update other user contacts ");
        }
        await Contact.deleteOne({ _id:req.params.id});
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};