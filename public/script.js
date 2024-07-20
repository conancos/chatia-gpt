const $form = document.querySelector('form');
const $chatScreen = document.querySelector('.chat-screen');
const $userInput = document.querySelector('textarea#user-input');

const $button = document.querySelector('#send-button');
const $messages = document.querySelector('ul');


$form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userMessage = $userInput.value.trim()
    
    $userInput.value = '';
    $userInput.focus();

    sendMessage(userMessage, "user");
    $button.setAttribute('disabled', true);    
})

function sendMessage(message, who) {

    if (message !== '' && who == "user") {
        const $userMessage = message;
        $messages.innerHTML += `
            <li class="message ${who}">
                <p class="newUsserMessageFirst">Tú</p>
                <p class="newUsserMessageLast">${$userMessage}</p>
                <small style="align-self:end;padding-right:10px">${new Date().toLocaleTimeString()}</small>        
            </li>`
        $chatScreen.scrollTop = $chatScreen.scrollHeight;

        /* setTimeout(() => {
            const botResponse = "Dime dime dime";
            sendMessage(botResponse, "bot");
            $button.removeAttribute('disabled');
        }, 1000) */

        /* $button.removeAttribute('disabled'); */
        
        launch($userMessage)
    }

    if (message !== '' && who == 'bot') {
        const $botMessage = message;
        $messages.innerHTML += `
            <li class="message ${who}">
                <p>GPT</p>
                <p class="newBotMessageLast">${$botMessage}</p>
                <small style="align-self:start;padding-left:10px">${new Date().toLocaleTimeString()}</small>        
            </li>`
        $chatScreen.scrollTop = $chatScreen.scrollHeight;
    }
}

async function launch(userMessage) {
    
    const response = await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
    });

    if (!response.ok) {
        throw new Error('Error al obtener la respuesta del bot');
    }

    const data = await response.json();

    sendMessage(data.botResponse, "bot");
    
    $button.removeAttribute('disabled');
}
