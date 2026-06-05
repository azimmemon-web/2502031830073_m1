const express = require('express');
const app = express();

// View Engine aur Static Files Setup (Taaki CSS load ho sake)
app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));

// Maan lete hain yeh aapka database ka fake data hai (Testing ke liye)
// Agar aapka MongoDB connected hai, toh aap iski jagah Database query use kar rahe honge.
const allContacts = [
    { _id: "1", first_name: "Rahul", last_name: "Sharma", email: "rahul@gmail.com", phone: "9876543210" },
    { _id: "2", first_name: "Amit", last_name: "Verma", email: "amit@gmail.com", phone: "9876543211" },
    { _id: "3", first_name: "Alfred", last_name: "Kuhlman", email: "alfred@test.com", phone: "98989898" },
    { _id: "4", first_name: "Frederick", last_name: "Jerde", email: "frederick@test.com", phone: "54545454" },
    { _id: "5", first_name: "Joannie", last_name: "McLaughlin", email: "joannie@test.com", phone: "75757575" }
];

// Main Route (All Contacts Page)
app.get('/', (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = 5; // Ek page par 5 contacts dikhane ke liye
    
    let totalContacts = allContacts.length;
    let totalPages = Math.ceil(totalContacts / limit);
    
    // Pagination ke liye array ko slice karna
    let startIdx = (page - 1) * limit;
    let endIdx = startIdx + limit;
    let contactsList = allContacts.slice(startIdx, endIdx);

    // 🚨 YEH HAI WOH LINE JO YAHOO BABA NE LIKHI THI AUR AAPKE MEIN MISSING THI!
    // Agar page 1 hai toh counter = 1. Agar page 2 hai toh counter = 6.
    let dynamicCounter = (page - 1) * limit + 1; 

    // EJS File ko render karna saare variables ke sath
    res.render('home', {
        contacts: contactsList,
        currentPage: page,
        totalPages: totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevPage: page - 1,
        nextPage: page + 1,
        counter: dynamicCounter // <-- Is wajah se unka code bina error ke chala!
    });
});

// Server port listen
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});