let canvas = document.getElementById('mycanvas')
let ctx = canvas.getContext("2d")
let colors = document.getElementsByClassName('single-colors'),
    color='rgb(252, 59, 0)', text="", font="sans", fontSize=40, fontColor="black",
    quantity=1, globalQuantity=0, simpleColor="red"

let shoppingCart = []

/* Draw the T-shirt once the html is loaded */

drawShirt()

/* 
  ==========================
        Event Listeners
  ==========================

*/

// Event listeners in case a color button is clicked
for(let btn of colors){

    btn.onclick = function(event){
        let element = document.getElementById(event.target.id)//Get the element

        if(element && element.style.backgroundColor != color){

            //Delete the checked symbol in every child
            for(let child of element.parentNode.children){
                child.innerHTML = ""
                child.style.padding = "10px"
                child.className = 'single-colors'
            }

            /* Add the check symbol and fix the padding */
            element.classList.add('selected-color')
            element.innerHTML = '<i class="fas fa-check"></i>'
            element.style.padding = '2.5px';

            /* Redraw the T-shirt */
            color = element.style.backgroundColor
            simpleColor = element.id
            drawShirt()
        }
    }
}
    
/* Event listener for the input text, every time a key is pressed the canvas is redrawn with the new text,
   making the changes in real time
*/

let textInput = document.getElementById('shirt-text')

textInput.onkeyup = function(){
    text = textInput.value
    drawShirt()
}


/* Event listeners that wait for HTML SELECT's to change their value and then redraw again */

let fontInput = document.getElementById('fontFamily')

fontInput.onchange = function(){
    font = fontInput.value
    drawShirt()
}

let fontSizeInput = document.getElementById('fontSize')

fontSizeInput.onchange = function(){
    fontSize = fontSizeInput.value
    drawShirt()
}

let fontColorInput = document.getElementById('fontColor')

fontColorInput.onchange = function () {
    fontColor = fontColorInput.value
    drawShirt()
}

let quantityInput = document.getElementById('quantity')
let newPrice = document.getElementById('newPrice')

quantityInput.onchange = function(){
    quantity = Number(quantityInput.value)
}

/* Wait until a t-shirt has been added to the car
    In case an element is added a new nodes must be appended into
    the shopping list in the html

*/
let addToCart = document.getElementById('addToCart')
let shoppingList = document.getElementById('shoppingList')

addToCart.onclick = function(event){

    if(shoppingCart.length == 0){
        document.getElementById('emptyList').style.display = 'none'
    }

    /* 
        Push a t-shirt object that contains all its properties,
        since the object keys have the same name as the global variables
        Ecmascript allows to write them only once, so instead of writing:

            text: text,
            color: color

        The program only writes:

            text,
            color
    
    */
    shoppingCart.push({
        text,
        color,
        simpleColor,
        fontColor,
        fontSize,
        quantity,
        font
    })

    //Parent element and class
    let htmlListElement = document.createElement('div')
    htmlListElement.className= 'disp-flex-spc-between'

    /* Data that is contained in the parent element */
    let textNode = document.createElement('p')
    //If there's no text just output "no text"
    textNode.innerHTML = (text.length == 0) ? 'no text' : text

    let colorNode = document.createElement('p')
    colorNode.innerHTML = simpleColor
    colorNode.style = "width: 5%"

    let quantityNode = document.createElement('p')
    quantityNode.innerHTML = quantity + 'pc'

    htmlListElement.append(colorNode)
    htmlListElement.append(textNode)
    htmlListElement.append(quantityNode)

    /* Append the new element on the shopping list element, above the prices */
    shoppingList.appendChild(htmlListElement)

    /* Change the new price displayed in the browser */
    globalQuantity+=quantity
    newPrice.innerHTML = '$ '+globalQuantity*4
}

/* When the submit button is clicked, the program must prevent the default behaviour and print an alert with the elements in the shopping list */

let buyButton = document.getElementById('buyButton')

buyButton.onclick = function (event){
    event.preventDefault()
    let alertText = "Order succesfully submitted  \n    You ordered:\n        "

    for(let elem of shoppingCart)
        alertText+=` Color: ${elem.simpleColor}, Text: ${elem.text}, Quantity: ${elem.quantity} \n        `        

    alert(alertText)
}

/*
    ==================
        Functions
    ==================

*/

function drawShirt(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const height = 280,
        beginX = 260
        beginY = 50,
        neckEndX = 374,
        quadraticCurveX = 410
        quadraticCurveY = 70,
        fsx = 440,
        fsy = 120,
        fsborderX = 410,
        fsbordery = 140,
        armpitX = 380,
        armpitY = 100


    ctx.beginPath()
    ctx.moveTo(beginX,beginY)
    ctx.quadraticCurveTo(300, 100, 340, 50)
    ctx.lineTo(neckEndX, beginY)
    ctx.quadraticCurveTo(quadraticCurveX, quadraticCurveY ,fsx, fsy)
    ctx.lineTo(fsborderX, fsbordery)
    ctx.lineTo(armpitX, armpitY)
    ctx.lineTo(armpitX, height)
    
    /* ================
        Draw Simetric
        ================
    */
    
    armpitX = getSimetric(armpitX)
    fsborderX = getSimetric(fsborderX)
    fsx = getSimetric(fsx)
    quadraticCurveX = getSimetric(quadraticCurveX)
    neckEndX = getSimetric(neckEndX)
    
    ctx.quadraticCurveTo(300, height + 40, armpitX, height)
    ctx.lineTo(armpitX, armpitY)
    ctx.lineTo(fsborderX, fsbordery)
    ctx.lineTo(fsx, fsy)
    ctx.quadraticCurveTo(quadraticCurveX, quadraticCurveY, neckEndX, beginY)
    ctx.lineTo(beginX, beginY)
    ctx.fillStyle = color

    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.clip()

    if(text != ""){
        ctx.font = fontSize + 'px ' + font
        ctx.textAlign = 'center'
        ctx.fillStyle = fontColor
        ctx.fillText(text, canvas.width/2, 150)
    }
    
}

 function getSimetric (original) {
    return (canvas.width/2) - (original - canvas.width/2)
}