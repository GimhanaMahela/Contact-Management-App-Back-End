const express = require("express");
const router = express.Router();
const {
    getContact, 
    getContacts, 
    createContact, 
    deleteContact,
    updateContact,
} = require("../controllers/contactController");  
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact).get(getContact);

module.exports = router;