const socket = io(process.env.PORT);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.getElementById('container');

var audio = new Audio('ting.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

const name = prompt("Enter Your Name ");
document.getElementById("demo").innerHTML =
    "Hello " + name + "! Welcome to V-Talk 👋🏻";

socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left')
});

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
});

socket.on('left',name=>{
    append(`${name} left the chat`,'center')
});


