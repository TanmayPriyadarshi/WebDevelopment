const createBtn = document.getElementById('createToDo');
const inputField = document.getElementById('todoText');
const ulEle = document.getElementById('listOfAllToDo');
console.log(createBtn);
console.log(inputField);

let listOfTodo = [];
let posOfTodo = [];
const ids = ['im1','im2','im3'];

createBtn.addEventListener('click', (e) => {
    let todoVal = inputField.value;
    console.log(todoVal);
    let liEle = htmlElementCreator(todoVal);
    console.log(liEle);
    ulEle.appendChild(liEle);

    eventListenerAdder(liEle.id);
    inputField.value = "";
})

function htmlElementCreator(todoVal) {
    listOfTodo.push(todoVal);
    posOfTodo.push(listOfTodo.indexOf(todoVal));
    let liEle = document.createElement('li');
    let image1 = document.createElement('img');
    image1.setAttribute('src','delicon.svg');
    image1.setAttribute('id', ids[0]);
    image1.setAttribute('class', `${listOfTodo.indexOf(todoVal)}`);
    let image2 = document.createElement('img');
    image2.setAttribute('src','uparrow.svg');
    image2.setAttribute('id',ids[1]);
    image2.setAttribute('class', `${listOfTodo.indexOf(todoVal)}`);
    let image3 = document.createElement('img');
    image3.setAttribute('src','downarrow.svg');
    image3.setAttribute('id', ids[2]);
    image3.setAttribute('class', `${listOfTodo.indexOf(todoVal)}`);
    let inputDisplayField = document.createElement('input');
    inputDisplayField.setAttribute('type','text');
    inputDisplayField.value = todoVal;
    inputDisplayField.setAttribute('readonly', true);
    liEle.appendChild(image1);
    liEle.appendChild(image2);
    liEle.appendChild(image3);
    liEle.appendChild(inputDisplayField);
    liEle.classList.add('todo__bodyMain');
    liEle.setAttribute('id', `${listOfTodo.indexOf(todoVal)}`)
    console.log(listOfTodo);
    console.log(posOfTodo);
    return liEle;
}

function eventListenerAdder(id){
    console.log('insie adder');
    let oneLi = document.getElementById(id);
    console.log(oneLi);
    let childs = oneLi.childNodes;
    console.log(childs);
    childs.forEach(ele =>{
        if(ids.includes(ele.id)){
            console.log(ele.id);
            console.log(ele);
            ele.addEventListener('click', (e) =>{
            console.log(e);
            console.dir(e);
            console.log(e.target.id);
            if(e.target.id === 'im1'){
                deleteTodo(e);
            }
            else if(e.target.id === 'im2'){
                upTheElement(e);
            }
            else{
                downTheElement(e);
            }
        })
    }
})

}

function deleteTodo(e){
   console.log(e.target);
   const classVal = e.target.className;
   const eleToBeDel = document.getElementById(classVal);
   const ulEleDel = document.getElementById('listOfAllToDo');
   while (ulEleDel.firstChild) {
    ulEleDel.removeChild(ulEleDel.firstChild);
   }
   listOfTodo.splice(parseInt(classVal),1);
   posOfTodo.splice(parseInt(classVal),1);
   console.log(listOfTodo);
   console.log(posOfTodo);
   for (let index = parseInt(classVal); index < posOfTodo.length; index++) {
    posOfTodo[index] -= 1;   
   }
   posOfTodo.forEach((pos) =>{
    let reli = reRenderListValue(listOfTodo[pos],pos);
    ulEle.appendChild(reli);
    eventListenerAdder(reli.id); 
    })
   console.log(listOfTodo);
   console.log(posOfTodo);
   return true;
}

function upTheElement(e) {
   console.log(e);
   console.log(listOfTodo);
   console.log(posOfTodo);
   const classVal = parseInt(e.target.className);
   console.log('li'+classVal);
   const ulEleDel = document.getElementById('listOfAllToDo');
   if(classVal != 0){
    while (ulEleDel.firstChild) {
        ulEleDel.removeChild(ulEleDel.firstChild);
       }
     let t = listOfTodo[classVal-1];
     console.log('hi'+t);
     console.log('hi'+listOfTodo[classVal]);
     listOfTodo[classVal-1] = listOfTodo[classVal];
     console.log('hi'+listOfTodo[classVal-1]);
     listOfTodo[classVal] = t;
     console.log('hi'+listOfTodo[classVal]);
     console.log(listOfTodo);
     console.log(posOfTodo);
     posOfTodo.forEach((pos) =>{
        let reli = reRenderListValue(listOfTodo[pos],pos);
        ulEle.appendChild(reli);
        eventListenerAdder(reli.id); 
     })
   }
   return true;
}

function downTheElement(e){
   console.log(e);
   console.log(listOfTodo);
   console.log(posOfTodo);
   const classVal = parseInt(e.target.className);
   console.log('li'+classVal);
   const ulEleDel = document.getElementById('listOfAllToDo');
   if(classVal != posOfTodo[posOfTodo.length-1]){
    while (ulEleDel.firstChild) {
        ulEleDel.removeChild(ulEleDel.firstChild);
       } 
       let t = listOfTodo[classVal+1];
       console.log('hi'+t);
       console.log('hi'+listOfTodo[classVal]);
       listOfTodo[classVal+1] = listOfTodo[classVal];
       console.log('hi'+listOfTodo[classVal-1]);
       listOfTodo[classVal] = t;
       console.log('hi'+listOfTodo[classVal]);
       console.log(listOfTodo);
       console.log(posOfTodo);
       posOfTodo.forEach((pos) =>{
          let reli = reRenderListValue(listOfTodo[pos],pos);
          ulEle.appendChild(reli);
          eventListenerAdder(reli.id); 
       }) 
   }
   return true;
}

function reRenderListValue(todoVal,Pos){
    let liEle = document.createElement('li');
    let image1 = document.createElement('img');
    image1.setAttribute('src','delicon.svg');
    image1.setAttribute('id', ids[0]);
    image1.setAttribute('class', Pos);
    let image2 = document.createElement('img');
    image2.setAttribute('src','uparrow.svg');
    image2.setAttribute('id',ids[1]);
    image2.setAttribute('class', Pos);
    let image3 = document.createElement('img');
    image3.setAttribute('src','downarrow.svg');
    image3.setAttribute('id', ids[2]);
    image3.setAttribute('class', Pos);
    let inputDisplayField = document.createElement('input');
    inputDisplayField.setAttribute('type','text');
    inputDisplayField.value = todoVal;
    inputDisplayField.setAttribute('readonly', true);
    liEle.appendChild(image1);
    liEle.appendChild(image2);
    liEle.appendChild(image3);
    liEle.appendChild(inputDisplayField);
    liEle.classList.add('todo__bodyMain');
    liEle.setAttribute('id', Pos);
    console.log(listOfTodo);
    console.log(posOfTodo);
    return liEle;
}