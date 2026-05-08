window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 1500);

});

/* HERO TEXT CHANGE */
const texts = [
    "Adventure is worthwhile ✈️",
    "Travel opens your heart 🌍",
    "Collect moments not things ❤️",
    "Escape ordinary life 🚗"
];

let index = 0;

setInterval(() => {

    index++;

    if (index >= texts.length) {
        index = 0;
    }

    document.getElementById("changingText").innerText = texts[index];

}, 3000);


/* CONTACT FORM */
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {

        alert("Please fill all details ❌");
        return;

    }

    alert("Message Sent Successfully ✅");

    form.reset();

});


/* CHATBOT */
const chatToggle = document.getElementById("chatToggle");
const chatbot = document.querySelector(".chatbot-container");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");


chatToggle.addEventListener("click", () => {
    chatbot.style.display = "block";
});


closeChat.addEventListener("click", () => {
    chatbot.style.display = "none";
});


function addMessage(message, className) {

    const div = document.createElement("div");

    div.classList.add(className);

    div.innerText = message;

    chatBody.appendChild(div);

    chatBody.scrollTop = chatBody.scrollHeight;

}


function botReply(question) {

    question = question.toLowerCase();

    if (question.includes("price") || question.includes("package")) {

        return "Our travel packages start from ₹49,999 and go up to ₹99,999 ✈️";

    }

    else if (question.includes("taxi")) {

        return "We provide Swift, Innova, Ertiga, Audi and BMW taxi services 🚗";

    }

    else if (question.includes("char dham")) {

        return "Char Dham includes Yamunotri, Gangotri, Kedarnath and Badrinath 🛕";

    }

    else if (question.includes("booking")) {

        return "Click on any package card to start booking 💳";

    }

    else if (question.includes("contact")) {

        return "You can contact us through the contact form available on the website 📞";

    }

    else {

        return "Sorry 😅 I can answer only travel related questions.";

    }

}


function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    addMessage(message, "user-message");

    const reply = botReply(message);

    setTimeout(() => {

        addMessage(reply, "bot-message");

    }, 500);

    userInput.value = "";

}


sendBtn.addEventListener("click", sendMessage);


userInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        sendMessage();
    }

});


/* PAYMENT GATEWAY */
const paymentModal = document.getElementById("paymentModal");
const selectedPackage = document.getElementById("selectedPackage");
const closePayment = document.getElementById("closePayment");
const payBtn = document.getElementById("payBtn");

let currentPackage = "";
let currentPrice = 0;


document.querySelectorAll(".package-card").forEach(card => {

    card.addEventListener("click", () => {

        const title = card.querySelector("h4");
        const price = card.querySelector("span");

        currentPackage = title.innerText;
        currentPrice = price.innerText.replace(/[^0-9]/g, "");

        selectedPackage.innerText =
            currentPackage + " - ₹" + currentPrice;

        paymentModal.style.display = "flex";

    });

});


closePayment.addEventListener("click", () => {

    paymentModal.style.display = "none";

});


payBtn.addEventListener("click", () => {

    const options = {

        key: "rzp_test_1DP5mmOlF5G5ag",

        amount: currentPrice * 100,

        currency: "INR",

        name: "HS Travels",

        description: currentPackage,

        image: "https://cdn-icons-png.flaticon.com/512/201/201623.png",

        handler: function (response) {

            alert(
                "Payment Successful ✅\nPayment ID: " +
                response.razorpay_payment_id
            );

        },

        prefill: {
            name: "Customer",
            email: "customer@gmail.com",
            contact: "9999999999"
        },

        theme: {
            color: "#ff0000"
        }

    };

    const rzp1 = new Razorpay(options);

    rzp1.open();

    paymentModal.style.display = "none";

});