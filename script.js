document.addEventListener("DOMContentLoaded", function () {
    // Add click event listener to the "Generate" button
    const generateBtn = document.querySelector(".generate-btn");
    generateBtn.addEventListener("click", validateInput);

    // Add keyup event listener to the input box to listen for the "Enter" key
    const inputBox = document.querySelector(".input-box");
    inputBox.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            validateInput();
        }
    });

    // Add paste event listener to the input box to listen for text pasted
    inputBox.addEventListener("paste", function () {
        // Use setTimeout to allow the input value to update after the paste event
        setTimeout(validateInput, 0);
    });
});

function validateInput() {
    const inputBox = document.querySelector(".input-box");
    let inputText = inputBox.value; // Get the input text

    // Remove all spaces from the input text
    inputText = inputText.replace(/\s/g, "");

    // Regular expression to check if the input contains only 0's and 1's
    const validInputRegex = /^[01]+$/;

    if (!validInputRegex.test(inputText)) {
        alert("Please enter only 0's and 1's in the input box.");
        return;
    }

    const bitsArray = inputText.split(""); // Convert the input text into an array of bits

    // Print the bits array below the input-button-container
    const outputContainer = document.getElementById("output-container");
    outputContainer.style.display = "block"; // Make the output container visible

    // Update the content of individual divs as needed
    const inputBitsDiv = document.getElementById("input-bits");
    inputBitsDiv.textContent = `Input Bits: [${bitsArray.join(", ")}]`;

    drawUnipolarNRZ(bitsArray);
    drawUnipolarNRZ_l(bitsArray);

}

function drawUnipolarNRZ(bitsArray) {
    let id = 0;

    const svg = document.getElementById("unipolar-nrz-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    if (bitsArray[0] === "1") {
        const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        initalLine.setAttribute("x1", 2);
        initalLine.setAttribute("y1", svgHeight - 20);
        initalLine.setAttribute("x2", 2);
        initalLine.setAttribute("y2", svgHeight - 80);
        initalLine.setAttribute("stroke", "#000");
        initalLine.setAttribute("stroke-width", "2");
        initalLine.setAttribute("id", id++);
        initalLine.style.transition = "all 0.3s ease";
        svg.appendChild(initalLine);
    }

    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];

        const x1 = i * bitWidth;
        const x2 = (i + 1) * bitWidth;

        let y1, y2;
        if (bitValue === "0") {
            y1 = svgHeight - 20; // Set the y coordinate for bit value "0"
            y2 = svgHeight - 20; // Set the y coordinate for bit value "0"
        } else {
            y1 = svgHeight - 80; // Set the y coordinate for bit value "1"
            y2 = svgHeight - 80; // Set the y coordinate for bit value "1"
        }

        // Create a line element and set its attributes
        const bitLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        setTimeout(() => {
            drawHorizontalLineWithTransition(svg, x1, y1, x2, y2);
        }, id = id + 2 * 100);

        const dottedX1 = x2;
        const dottedY1 = svgHeight - 90;
        const dottedX2 = x2;
        const dottedY2 = svgHeight - 10;
        setTimeout(() => {
            drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);
        }, id = id + 2 * 100);

        if (bitsArray[i] != bitsArray[i + 1] && i !== bitsArray.length - 1) {
            const verticalX1 = x2;
            const verticalX2 = x2;
            let verticalY1 = svgHeight - 80;
            let verticalY2 = svgHeight - 20;
            if (bitsArray[i] === "0") {
                verticalY1 = verticalY2;
                verticalY2 = svgHeight - 80;
            }
            setTimeout(() => {
                drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2);
            }, id = id + 2 * 100);
        }
    }
}


function drawUnipolarNRZ_l(bitsArray) {
    let id = 0;

    const svg = document.getElementById("unipolar-nrz-l-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    if (bitsArray[0] === "0") {
        const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        initalLine.setAttribute("x1", 2);
        initalLine.setAttribute("y1", svgHeight - 20);
        initalLine.setAttribute("x2", 2);
        initalLine.setAttribute("y2", svgHeight - 80);
        initalLine.setAttribute("stroke", "#000");
        initalLine.setAttribute("stroke-width", "2");
        initalLine.setAttribute("id", id++);
        svg.appendChild(initalLine);
    }

    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];

        const x1 = i * bitWidth;
        const x2 = (i + 1) * bitWidth;

        let y1, y2;
        if (bitValue === "1") {
            y1 = svgHeight - 20; // Set the y coordinate for bit value "1"
            y2 = svgHeight - 20; // Set the y coordinate for bit value "1"
        } else {
            y1 = svgHeight - 80; // Set the y coordinate for bit value "0"
            y2 = svgHeight - 80; // Set the y coordinate for bit value "0"
        }

        // Create a line element and set its attributes
        const bitLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        setTimeout(() => {
            drawHorizontalLineWithTransition(svg, x1, y1, x2, y2);
        }, id = id + 2 * 100);

        const dottedX1 = x2;
        const dottedY1 = svgHeight - 90;
        const dottedX2 = x2;
        const dottedY2 = svgHeight - 10;
        setTimeout(() => {
            drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);
        }, id = id + 2 * 100);

        if (bitsArray[i] != bitsArray[i + 1] && i !== bitsArray.length - 1) {
            const verticalX1 = x2;
            const verticalX2 = x2;
            let verticalY1 = svgHeight - 80;
            let verticalY2 = svgHeight - 20;
            if (bitsArray[i] === "1") {
                verticalY1 = verticalY2;
                verticalY2 = svgHeight - 80;
            }
            setTimeout(() => {
                drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2);
            }, id = id + 2 * 100);
        }
    }
}


// Line Draw Animation's
function drawHorizontalLineWithTransition(svg, x1, y1, x2, y2) {
    const bitLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    bitLine.setAttribute("x1", x1);
    bitLine.setAttribute("y1", y1);
    bitLine.setAttribute("x2", x1); // Start the horizontal line at the same point to create the draw effect
    bitLine.setAttribute("y2", y1);
    bitLine.setAttribute("stroke", "#000");
    bitLine.setAttribute("stroke-width", "2");
    bitLine.style.transition = "all 0.3s ease";
    svg.appendChild(bitLine);

    const duration = 400;
    let start = null;
    let isAnimating = true; // Flag to check if we should continue animating

    // Create an animation function for the horizontal line using requestAnimationFrame
    function animateHorizontalLine(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Calculate the new x2 coordinate for the horizontal line to create the draw effect
        const newX2 = x1 + (progress / duration) * (x2 - x1);
        bitLine.setAttribute("x2", newX2);

        // Continue the animation until the duration is reached
        if (progress < duration && isAnimating) {
            requestAnimationFrame(animateHorizontalLine);
        } else {
            // If the animation is done, set the x2 coordinate to its final value
            bitLine.setAttribute("x2", x2);
        }
    }
    requestAnimationFrame(animateHorizontalLine);
}

function drawVerticalLineWithTransition(svg, x1, y1, x2, y2) {
    const verticalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    verticalLine.setAttribute("x1", x1);
    verticalLine.setAttribute("y1", y1);
    verticalLine.setAttribute("x2", x1);
    verticalLine.setAttribute("y2", y1); // Start the vertical line at the same point to create the draw effect
    verticalLine.setAttribute("stroke", "#000");
    verticalLine.setAttribute("stroke-width", "2");
    verticalLine.style.transition = "all 0.3s ease";
    svg.appendChild(verticalLine);

    const duration = 400;
    let start = null;
    let isAnimating = true; // Flag to check if we should continue animating

    // Create an animation function for the vertical line using requestAnimationFrame
    function animateVerticalLine(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Calculate the new y2 coordinate for the vertical line to create the draw effect
        const newY2 = y1 + (progress / duration) * (y2 - y1);
        verticalLine.setAttribute("y2", newY2);

        // Continue the animation until the duration is reached
        if (progress < duration && isAnimating) {
            requestAnimationFrame(animateVerticalLine);
        } else {
            // If the animation is done, set the y2 coordinate to its final value
            verticalLine.setAttribute("y2", y2);
        }
    }
    requestAnimationFrame(animateVerticalLine);
}

function drawDottedLineWithTransition(svg, x1, y1, x2, y2) {
    const dottedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    dottedLine.setAttribute("x1", x1);
    dottedLine.setAttribute("y1", y1);
    dottedLine.setAttribute("x2", x2);
    dottedLine.setAttribute("y2", y2);
    dottedLine.setAttribute("stroke", "#000");
    dottedLine.setAttribute("stroke-width", "1");
    dottedLine.setAttribute("stroke-dasharray", "4, 4");
    dottedLine.style.transition = "all 0.3s ease";
    svg.appendChild(dottedLine);
}