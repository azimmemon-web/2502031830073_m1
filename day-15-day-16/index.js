const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Contact = require("./models/contacts.models")

// Database Connection (Yeh bilkul sahi hai!)
mongoose.connect('mongodb://127.0.0.1:27017/contacts-crud') 
.then(() => console.log("Database connected successfully!"))
.catch((err) => console.error("Database connection error:", err));

//Routes


// View Engine aur Static Files Setup (Taaki CSS load ho sake)
app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));

// Fake Database Array (Dummy Data with Address field)
let allContacts = [
    { _id: "1", first_name: "Rahul", last_name: "Sharma", email: "rahul@gmail.com", phone: "9876543210", address: "Mumbai, India" },
    { _id: "2", first_name: "Amit", last_name: "Verma", email: "amit@gmail.com", phone: "9876543211", address: "Delhi, India" },
    { _id: "3", first_name: "Alfred", last_name: "Kuhlman", email: "alfred@test.com", phone: "98989898", address: "New York, USA" },
    { _id: "4", first_name: "Frederick", last_name: "Jerde", email: "frederick@test.com", phone: "54545454", address: "London, UK" },
    { _id: "5", first_name: "Joannie", last_name: "McLaughlin", email: "joannie@test.com", phone: "75757575", address: "Toronto, Canada" }
];

// ==========================================
// 1. MAIN ROUTE (All Contacts Page - home.ejs)
// ==========================================
app.get('/', (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = 5; // Ek page par 5 contacts dikhane ke liye
    
    let totalContacts = allContacts.length;
    let totalPages = Math.ceil(totalContacts / limit);
    
    // Pagination ke liye array ko slice karna
    let startIdx = (page - 1) * limit;
    let endIdx = startIdx + limit;
    let contactsList = allContacts.slice(startIdx, endIdx);

    // Yahoo Baba dynamic counter logic
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
        counter: dynamicCounter
    });
});

// ==========================================
// 2. ADD NEW CONTACT ROUTES
// ==========================================
// Form page open karne ke liye
app.get('/add-contact', (req, res) => {
    res.render('add-contact');
});

// Form submit hone par data save karne ke liye
app.post('/add-contact', (req, res) => {
    const { first_name, last_name, email, phone, address } = req.body;
    
    const newContact = {
        _id: String(allContacts.length + 1), // Auto increment ID
        first_name,
        last_name,
        email,
        phone,
        address
    };
    
    allContacts.push(newContact);
    res.redirect('/'); // Save karne ke baad home page par redirect
});

// ==========================================
// 3. SHOW SINGLE CONTACT DETAILS ROUTE
// ==========================================
app.get('/show-contact/:id', (req, res) => {
    const foundContact = allContacts.find(c => c._id === req.params.id);
    
    if (foundContact) {
        res.render('show-contact', { contact: foundContact });
    } else {
        res.status(404).render('404', { message: "Contact not found!" });
    }
});

// ==========================================
// 4. UPDATE/EDIT CONTACT ROUTES
// ==========================================
// Form mein purana data bhar kar dikhane ke liye
app.get('/update-contact/:id', (req, res) => {
    const foundContact = allContacts.find(c => c._id === req.params.id);
    
    if (foundContact) {
        res.render('update-contact', { contact: foundContact });
    } else {
        res.status(404).render('404', { message: "Contact not found to update!" });
    }
});

// Form submit hone par data update karne ke liye
app.post('/update-contact/:id', (req, res) => {
    const { first_name, last_name, email, phone, address } = req.body;
    const index = allContacts.findIndex(c => c._id === req.params.id);
    
    if (index !== -1) {
        // Data update kiya
        allContacts[index] = { _id: req.params.id, first_name, last_name, email, phone, address };
        res.redirect('/');
    } else {
        res.status(500).render('500', { message: "Internal server error during update." });
    }
});

// ==========================================
// 5. DELETE CONTACT ROUTE
// ==========================================
app.get('/delete-contact/:id', (req, res) => {
    allContacts = allContacts.filter(c => c._id !== req.params.id);
    res.redirect('/');
});

// ==========================================
// 6. GLOBAL 404 PAGE ERROR HANDLING
// ==========================================
// Agar user koi bhi galat URL daalega toh auto 404.ejs open hoga
app.use((req, res) => {
    res.status(404).render('404', { message: "Page not found." });
});

// Server port listen
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});