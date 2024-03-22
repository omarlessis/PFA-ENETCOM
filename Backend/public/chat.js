// var socket = io.connect('http://localhost:9000');
// var pseudo;

// do {
//     pseudo = prompt('Quel est ton nom ?');
// } while (!pseudo);
// socket.emit('pseudo',pseudo);
// document.title = pseudo +' - '+document.title;

// //events
// socket.on('newUser',(pseudo)=>{
// createElementFunction('newUser',pseudo)
// });

// socket.on('quitUser',(pseudo)=>{
//     createElementFunction('quitUser',pseudo)
// });


// //functions
// function createElementFunction(element,content){
//     const newElement= document.createElement('div');
//     switch(element){
//         case 'newUser':
//             newElement.classList.add(element,'message');
//             newElement.textContent=content+'a rejoint le chat';
//             document.getElementById('msgContainer').appendChild(newElement);
//             break;
//         case 'quitUser':
//             newElement.classList.add(element,'message');
//             newElement.textContent=content+'a quité le chat';
//             document.getElementById('msgContainer').appendChild(newElement);
//             break;    
//     }
// }
var socket = io.connect('http://localhost:9000');

var pseudo;

do {
    pseudo = prompt('Quel est votre nom ?');
} while (!pseudo);
socket.emit('pseudo',pseudo);
document.title = pseudo +' - '+document.title;

document.getElementById('chatForm').addEventListener('submit',(e)=>{

    e.preventDefault();

    const textInput= document.getElementById('msgInput').value;
    document.getElementById('msgInput').value='';

    if (textInput.length >0){
        socket.emit('newMessage',textInput);
        createElementFunction('newMessageMe',textInput);
    }else{
        return false;
    }

});

//events
socket.on('newUser',(pseudo)=>{
createElementFunction('newUser',pseudo)
});
socket.on('newMessageAll',(content)=>{
    createElementFunction('newMessageAll',content);
})

socket.on('quitUser',(pseudo)=>{
    createElementFunction('quitUser',pseudo)
});


//functions
function createElementFunction(element,content){
    const newElement= document.createElement('div');
    switch(element){
        case 'newUser':
            newElement.classList.add(element,'message');
            newElement.textContent=content+' a rejoint le chat';
            document.getElementById('msgContainer').appendChild(newElement);
            break;
        case 'newMessageMe':  
        newElement.classList.add(element,'message');
        newElement.innerHTML=pseudo+':'+content;  
        document.getElementById('msgContainer').appendChild(newElement);
        break;
        case 'newMessageAll':  
        newElement.classList.add(element,'message');
        newElement.innerHTML=content.pseudo+':'+content.message;  
        document.getElementById('msgContainer').appendChild(newElement);
        break;
        case 'quitUser':
            newElement.classList.add(element,'message');
            newElement.textContent=content+' a quitté le chat';
            document.getElementById('msgContainer').appendChild(newElement);
            break;    
    }
}
