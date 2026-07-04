//==================================================
// chatbot.js
// AquaHarvest AI Floating Chatbot
//==================================================

document.addEventListener("DOMContentLoaded", () => {

    createChatbot();

});

//==================================================
// Chat Responses
//==================================================

const botResponses = {

    "hello":"👋 Hello! Welcome to AquaHarvest. How can I help you today?",

    "hi":"👋 Hi there! What would you like to know?",

    "fish":"🐟 Healthy fish require proper feed, oxygen, and water quality monitoring.",

    "feed":"🌾 We recommend 30–35% protein floating feed for most freshwater fish.",

    "disease":"🩺 Upload an image in the AI Diagnostic Center and our AI will analyze possible fish diseases.",

    "water":"💧 Ideal pond pH is 6.8–8.2 with dissolved oxygen above 5 mg/L.",

    "oxygen":"🫧 Low oxygen can stress fish. Use an aerator and avoid overfeeding.",

    "temperature":"🌡️ Most freshwater fish grow best between 24°C and 30°C.",

    "market":"🛒 Visit our Marketplace to purchase premium feed, sensors, medicines, and equipment.",

    "ai":"🤖 Our AI tools include Disease Detection, Water Analysis, Growth Prediction, Feed Recommendation, Fish Counting, Harvest Prediction and much more.",

    "contact":"📧 You can contact AquaHarvest anytime through the Contact page.",

    "thanks":"😊 You're welcome! Happy farming!",

    "default":"🤖 I'm AquaBot. I can help with fish farming, diseases, water quality, marketplace products, AI tools, feeding, oxygen, and harvesting."

};

//==================================================
// Create Chatbot
//==================================================

function createChatbot(){

document.body.insertAdjacentHTML("beforeend",`

<div class="chat-window" id="chatWindow">

<div class="chat-header">

<div>

<h5 class="mb-0">

🤖 AquaBot AI

</h5>

<small>Online</small>

</div>

<div>

<button
class="btn btn-sm btn-light"
id="minimizeChat">

<i class="bi bi-dash-lg"></i>

</button>

</div>

</div>

<div class="chat-body" id="chatBody">

<div class="chat-message bot">

👋 Hello!

Welcome to AquaHarvest.

Ask me anything about fish farming, AI diagnostics, marketplace or water quality.

</div>

</div>

<div class="px-3 pb-2">

<div class="d-flex flex-wrap gap-2">

<button class="btn btn-sm btn-outline-info quick-reply">

Fish Disease

</button>

<button class="btn btn-sm btn-outline-info quick-reply">

Water Quality

</button>

<button class="btn btn-sm btn-outline-info quick-reply">

Marketplace

</button>

<button class="btn btn-sm btn-outline-info quick-reply">

AI Tools

</button>

</div>

</div>

<div class="chat-footer">

<input

type="text"

id="chatInput"

placeholder="Ask AquaBot..."

autocomplete="off">

<button id="sendMessage">

<i class="bi bi-send-fill"></i>

</button>

</div>

</div>

`);

initializeChatbot();

}

//==================================================
// Initialize
//==================================================

function initializeChatbot(){

const toggle=document.getElementById("chatToggle");
const windowBox=document.getElementById("chatWindow");
const send=document.getElementById("sendMessage");
const input=document.getElementById("chatInput");
const minimize=document.getElementById("minimizeChat");

toggle.addEventListener("click",()=>{

windowBox.style.display=

windowBox.style.display==="flex"

?"none"

:"flex";

});

minimize.addEventListener("click",()=>{

windowBox.style.display="none";

});

send.addEventListener("click",sendMessage);

input.addEventListener("keypress",e=>{

if(e.key==="Enter"){

sendMessage();

}

});

document.querySelectorAll(".quick-reply").forEach(button=>{

button.onclick=()=>{

input.value=button.innerText;

sendMessage();

};

});

}

//==================================================
// Send
//==================================================

function sendMessage(){

const input=document.getElementById("chatInput");

const text=input.value.trim();

if(text==="") return;

addMessage(text,"user");

input.value="";

typingAnimation();

setTimeout(()=>{

botReply(text);

},1200);

}

//==================================================
// User Message
//==================================================

function addMessage(message,type){

const body=document.getElementById("chatBody");

body.innerHTML+=`

<div class="chat-message ${type}">

${message}

</div>

`;

body.scrollTop=body.scrollHeight;

}

//==================================================
// Typing
//==================================================

function typingAnimation(){

const body=document.getElementById("chatBody");

body.innerHTML+=`

<div
class="chat-message bot"
id="typing">

<span class="spinner-grow spinner-grow-sm"></span>

<span class="spinner-grow spinner-grow-sm"></span>

<span class="spinner-grow spinner-grow-sm"></span>

</div>

`;

body.scrollTop=body.scrollHeight;

}

//==================================================
// AI Reply
//==================================================

function botReply(question){

const typing=document.getElementById("typing");

if(typing) typing.remove();

let answer=botResponses.default;

const lower=question.toLowerCase();

for(const key in botResponses){

if(lower.includes(key)){

answer=botResponses[key];

break;

}

}

addMessage(answer,"bot");

}

//==================================================
// Public API
//==================================================

window.openChatbot=function(){

document.getElementById("chatWindow").style.display="flex";

};

window.closeChatbot=function(){

document.getElementById("chatWindow").style.display="none";

};