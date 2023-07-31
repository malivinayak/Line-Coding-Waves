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
        alert("Please enter only 0's and 1's in the input box.\nSample Input is updated in input box");
        inputBox.value = "10010110";
        return;
    }

    const bitsArray = inputText.split(""); // Convert the input text into an array of bits

    // Print the bits array below the input-button-container
    const outputContainer = document.getElementById("output-container");
    outputContainer.style.display = "block"; // Make the output container visible

    // Update the content of individual divs as needed
    // const inputBitsDiv = document.getElementById("input-bits");
    // inputBitsDiv.textContent = `Input Bits: [${bitsArray.join(", ")}]`;

    drawUnipolarNRZ(bitsArray);
    drawPolarNRZ_l(bitsArray);
    drawPolarNRZ_i(bitsArray);
    drawPolarRZ(bitsArray);
    drawManchester(bitsArray);
    drawDiffManchester(bitsArray);
    drawAMI(bitsArray);
    drawPseudoternary(bitsArray);

}

// Wave Creation

const axisHeight = 75;
const waveHeight = 35;
const upperLimit = axisHeight + waveHeight;
const lowerLimit = axisHeight - waveHeight;
const upperDottedLimit = axisHeight + (waveHeight + 12);
const lowerDottedLimit = axisHeight - (waveHeight + 12);
const bitHeight = lowerLimit - 30;

async function drawUnipolarNRZ(bitsArray) {
    let id = 0;

    const svg = document.getElementById("unipolar-nrz-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    initalLine.setAttribute("x1", 1.5);
    initalLine.setAttribute("x2", 1.5);
    if (bitsArray[0] === "1") {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - upperLimit);
    } else {
        initalLine.setAttribute("y1", svgHeight - lowerLimit);
        initalLine.setAttribute("y2", svgHeight - axisHeight);
    }
    initalLine.setAttribute("stroke", "#000");
    initalLine.setAttribute("stroke-width", "2");
    initalLine.setAttribute("id", id++);
    svg.appendChild(initalLine);

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", 0);
    axis.setAttribute("x2", svgWidth);
    axis.setAttribute("y1", svgHeight - axisHeight);
    axis.setAttribute("y2", svgHeight - axisHeight);
    axis.setAttribute("stroke", "#aaa");
    axis.setAttribute("stroke-width", "1");
    axis.setAttribute("id", id++);
    svg.appendChild(axis);

    await displayNextBit(svg, bitWidth / 2, svgHeight - bitHeight, bitsArray[0])
    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];

        const x1 = i * bitWidth;
        const x2 = (i + 1) * bitWidth;

        let y1, y2;
        if (bitValue === "0") {
            y1 = svgHeight - lowerLimit; // Set the y coordinate for bit value "0"
            y2 = svgHeight - lowerLimit; // Set the y coordinate for bit value "0"
        } else {
            y1 = svgHeight - upperLimit; // Set the y coordinate for bit value "1"
            y2 = svgHeight - upperLimit; // Set the y coordinate for bit value "1"
        }

        // Create a line element and set its attributes
        await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 750);

        const dottedX1 = x2;
        const dottedY1 = svgHeight - upperDottedLimit;
        const dottedX2 = x2;
        const dottedY2 = svgHeight - lowerDottedLimit;
        await drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);
        await animationDelay();

        // Display Next bitValue 
        if (i !== bitsArray.length - 1)
            await displayNextBit(svg, x2 + bitWidth / 2, svgHeight - bitHeight, bitsArray[i + 1])

        if (bitsArray[i] != bitsArray[i + 1] && i !== bitsArray.length - 1) {
            const verticalX1 = x2;
            const verticalX2 = x2;
            let verticalY1 = svgHeight - upperLimit;
            let verticalY2 = svgHeight - lowerLimit;
            if (bitsArray[i] === "0") {
                verticalY1 = verticalY2;
                verticalY2 = svgHeight - upperLimit;
            }
            await drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2, 250);
        }
        else await waitForVerticalLine(svg, dottedX1, dottedY1, dottedX2, dottedY2, 250);
    }
}

async function drawPolarNRZ_l(bitsArray) {
    let id = 0;

    const svg = document.getElementById("polar-nrz-l-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    // Create a initial line element and set its attributes
    const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    initalLine.setAttribute("x1", 1.5);
    initalLine.setAttribute("x2", 1.5);
    if (bitsArray[0] === "0") {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - upperLimit);
    } else {
        initalLine.setAttribute("y1", svgHeight - lowerLimit);
        initalLine.setAttribute("y2", svgHeight - axisHeight);
    }
    initalLine.setAttribute("stroke", "#000");
    initalLine.setAttribute("stroke-width", "2");
    initalLine.setAttribute("id", id++);
    svg.appendChild(initalLine);

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", 0);
    axis.setAttribute("x2", svgWidth);
    axis.setAttribute("y1", svgHeight - axisHeight);
    axis.setAttribute("y2", svgHeight - axisHeight);
    axis.setAttribute("stroke", "#aaa");
    axis.setAttribute("stroke-width", "1");
    axis.setAttribute("id", id++);
    svg.appendChild(axis);

    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    await displayNextBit(svg, bitWidth / 2, svgHeight - bitHeight, bitsArray[0])
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];

        const x1 = i * bitWidth;
        const x2 = (i + 1) * bitWidth;

        let y1, y2;
        if (bitValue === "1") {
            y1 = svgHeight - lowerLimit; // Set the y coordinate for bit value "1"
            y2 = svgHeight - lowerLimit; // Set the y coordinate for bit value "1"
        } else {
            y1 = svgHeight - upperLimit; // Set the y coordinate for bit value "0"
            y2 = svgHeight - upperLimit; // Set the y coordinate for bit value "0"
        }

        // Create a line element and set its attributes
        await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 750);

        const dottedX1 = x2;
        const dottedY1 = svgHeight - upperDottedLimit;
        const dottedX2 = x2;
        const dottedY2 = svgHeight - lowerDottedLimit;
        await await drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);

        // Display Next bitValue 
        if (i !== bitsArray.length - 1)
            await displayNextBit(svg, x2 + bitWidth / 2, svgHeight - bitHeight, bitsArray[i + 1])

        if (bitsArray[i] != bitsArray[i + 1] && i !== bitsArray.length - 1) {
            const verticalX1 = x2;
            const verticalX2 = x2;
            let verticalY1 = svgHeight - upperLimit;
            let verticalY2 = svgHeight - lowerLimit;
            if (bitsArray[i] === "1") {
                verticalY1 = verticalY2;
                verticalY2 = svgHeight - upperLimit;
            }
            await drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2, 250);
        }
        else await waitForVerticalLine(svg, dottedX1, dottedY1, dottedX2, dottedY2, 250);
    }
}

async function drawPolarNRZ_i(bitsArray) {
    let id = 0;

    const svg = document.getElementById("polar-nrz-i-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    initalLine.setAttribute("x1", 1.5);
    initalLine.setAttribute("x2", 1.5);
    if (bitsArray[0] === "1") {
        initalLine.setAttribute("y1", svgHeight - lowerLimit);
        initalLine.setAttribute("y2", svgHeight - upperLimit);
    } else {
        initalLine.setAttribute("y1", svgHeight - lowerLimit);
        initalLine.setAttribute("y2", svgHeight - lowerLimit);
    }
    initalLine.setAttribute("stroke", "#000");
    initalLine.setAttribute("stroke-width", "2");
    initalLine.setAttribute("id", id++);
    svg.appendChild(initalLine);

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", 0);
    axis.setAttribute("x2", svgWidth);
    axis.setAttribute("y1", svgHeight - axisHeight);
    axis.setAttribute("y2", svgHeight - axisHeight);
    axis.setAttribute("stroke", "#aaa");
    axis.setAttribute("stroke-width", "1");
    axis.setAttribute("id", id++);
    svg.appendChild(axis);

    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    await displayNextBit(svg, bitWidth / 2, svgHeight - bitHeight, bitsArray[0])
    let isActive = Boolean(false);
    let y1 = svgHeight - upperLimit;
    let y2 = svgHeight - upperLimit;
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];

        const x1 = i * bitWidth;
        const x2 = (i + 1) * bitWidth;

        if (bitValue === "1") {
            isActive = !isActive;
            if (isActive) {
                y1 = svgHeight - lowerLimit;
                y2 = svgHeight - lowerLimit;
            } else {
                y1 = svgHeight - upperLimit;
                y2 = svgHeight - upperLimit;
            }
        }
        // Create a line element and set its attributes
        await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 750);

        const dottedX1 = x2;
        const dottedY1 = svgHeight - upperDottedLimit;
        const dottedX2 = x2;
        const dottedY2 = svgHeight - lowerDottedLimit;
        await await drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);

        // Display Next bitValue 
        if (i !== bitsArray.length - 1)
            await displayNextBit(svg, x2 + bitWidth / 2, svgHeight - bitHeight, bitsArray[i + 1])

        if (bitsArray[i + 1] === "1" && i != bitsArray.length - 1) {
            const verticalX1 = x2;
            const verticalX2 = x2;
            let verticalY1 = svgHeight - lowerLimit;
            let verticalY2 = svgHeight - upperLimit;
            if (y1 == svgHeight - upperLimit) {
                verticalY1 = svgHeight - upperLimit;
                verticalY2 = svgHeight - lowerLimit;
            }
            await drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2, 250);
        }
        else await waitForVerticalLine(svg, dottedX1, dottedY1, dottedX2, dottedY2, 250);
    }
}

async function drawPolarRZ(bitsArray) {
    let id = 0;

    const svg = document.getElementById("polar-rz-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    initalLine.setAttribute("x1", 1.5);
    initalLine.setAttribute("x2", 1.5);
    if (bitsArray[0] === "1") {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - upperLimit);
    } else {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - lowerLimit);
    }
    initalLine.setAttribute("stroke", "#000");
    initalLine.setAttribute("stroke-width", "2");
    initalLine.setAttribute("id", id++);
    svg.appendChild(initalLine);

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", 0);
    axis.setAttribute("x2", svgWidth);
    axis.setAttribute("y1", svgHeight - axisHeight);
    axis.setAttribute("y2", svgHeight - axisHeight);
    axis.setAttribute("stroke", "#aaa");
    axis.setAttribute("stroke-width", "1");
    axis.setAttribute("id", id++);
    svg.appendChild(axis);

    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    await displayNextBit(svg, bitWidth / 2, svgHeight - bitHeight, bitsArray[0])
    let y1 = svgHeight;
    let y2 = svgHeight;
    let x1 = bitWidth;
    let x2 = 2 * bitWidth;
    let pulseWidth = bitWidth / 2;
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];
        if (bitValue === "1") {
            x1 = i * bitWidth;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - upperLimit;
            y2 = svgHeight - upperLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
            y2 = svgHeight - axisHeight;
            await drawVerticalLineWithTransition(svg, x2, y1, x2, y2, 250);
            x1 = x2;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - axisHeight;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
        } else {
            x1 = i * bitWidth;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - lowerLimit;
            y2 = svgHeight - lowerLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
            y2 = svgHeight - axisHeight;
            await drawVerticalLineWithTransition(svg, x2, y1, x2, y2, 250);
            x1 = x2;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - axisHeight;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
        }

        const dottedX1 = (i + 1) * bitWidth;
        const dottedY1 = svgHeight - upperDottedLimit;
        const dottedX2 = (i + 1) * bitWidth;
        const dottedY2 = svgHeight - lowerDottedLimit;
        await await drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);

        // Display Next bitValue 
        if (i !== bitsArray.length - 1)
            await displayNextBit(svg, x2 + bitWidth / 2, svgHeight - bitHeight, bitsArray[i + 1])

        if (i !== bitsArray.length - 1) {
            if (bitsArray[i + 1] === "0") {
                x1 = (i + 1) * bitWidth;
                y1 = svgHeight - axisHeight;
                y2 = svgHeight - lowerLimit;
                await drawVerticalLineWithTransition(svg, x1, y1, x1, y2, 200);
            } else {
                x1 = (i + 1) * bitWidth;
                y1 = svgHeight - axisHeight;
                y2 = svgHeight - upperLimit;
                await drawVerticalLineWithTransition(svg, x1, y1, x1, y2, 200);
            }
        }
    }
}

async function drawManchester(bitsArray) {
    let id = 0;

    const svg = document.getElementById("manchester-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    initalLine.setAttribute("x1", 1.5);
    initalLine.setAttribute("x2", 1.5);
    if (bitsArray[0] === "0") {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - upperLimit);
    } else {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - lowerLimit);
    }
    initalLine.setAttribute("stroke", "#000");
    initalLine.setAttribute("stroke-width", "2");
    initalLine.setAttribute("id", id++);
    svg.appendChild(initalLine);

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", 0);
    axis.setAttribute("x2", svgWidth);
    axis.setAttribute("y1", svgHeight - axisHeight);
    axis.setAttribute("y2", svgHeight - axisHeight);
    axis.setAttribute("stroke", "#aaa");
    axis.setAttribute("stroke-width", "1");
    axis.setAttribute("id", id++);
    svg.appendChild(axis);

    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    await displayNextBit(svg, bitWidth / 2, svgHeight - bitHeight, bitsArray[0])
    let y1 = svgHeight;
    let y2 = svgHeight;
    let x1 = bitWidth;
    let x2 = 2 * bitWidth;
    let pulseWidth = bitWidth / 2;
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];
        if (bitValue === "0") {
            x1 = i * bitWidth;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - upperLimit;
            y2 = svgHeight - upperLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
            y2 = svgHeight - lowerLimit;
            await drawVerticalLineWithTransition(svg, x2, y1, x2, y2, 250);
            x1 = x2;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - lowerLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
        } else {
            x1 = i * bitWidth;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - lowerLimit;
            y2 = svgHeight - lowerLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
            y2 = svgHeight - upperLimit;
            await drawVerticalLineWithTransition(svg, x2, y1, x2, y2, 250);
            x1 = x2;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - upperLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
        }

        const dottedX1 = (i + 1) * bitWidth;
        const dottedY1 = svgHeight - upperDottedLimit;
        const dottedX2 = (i + 1) * bitWidth;
        const dottedY2 = svgHeight - lowerDottedLimit;
        await await drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);

        // Display Next bitValue 
        if (i !== bitsArray.length - 1)
            await displayNextBit(svg, x2 + bitWidth / 2, svgHeight - bitHeight, bitsArray[i + 1])

        x1 = i * bitWidth;
        y1 = svgHeight - lowerLimit;
        y2 = svgHeight - upperLimit;
        if (i !== bitsArray.length - 1 && bitsArray[i] === bitsArray[i + 1]) {
            if (bitsArray[i + 1] === "0") {
                x1 = (i + 1) * bitWidth;
                y1 = svgHeight - lowerLimit;
                y2 = svgHeight - upperLimit;
                await drawVerticalLineWithTransition(svg, x1, y1, x1, y2, 200);
            } else {
                x1 = (i + 1) * bitWidth;
                y1 = svgHeight - upperLimit;
                y2 = svgHeight - lowerLimit;
                await drawVerticalLineWithTransition(svg, x1, y1, x1, y2, 200);
            }
        }
        else {
            await waitForVerticalLine(svg, x1, y1, x1, y2, 200)
        }
    }
}

async function drawDiffManchester(bitsArray) {
    let id = 0;

    const svg = document.getElementById("diff-manchester-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    initalLine.setAttribute("x1", 1.5);
    initalLine.setAttribute("x2", 1.5);
    if (bitsArray[0] === "1") {
        initalLine.setAttribute("y1", svgHeight - upperLimit);
        initalLine.setAttribute("y2", svgHeight - upperLimit);
    } else {
        initalLine.setAttribute("y1", svgHeight - upperLimit);
        initalLine.setAttribute("y2", svgHeight - lowerLimit);
    }
    initalLine.setAttribute("stroke", "#000");
    initalLine.setAttribute("stroke-width", "2");
    initalLine.setAttribute("id", id++);
    svg.appendChild(initalLine);

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", 0);
    axis.setAttribute("x2", svgWidth);
    axis.setAttribute("y1", svgHeight - axisHeight);
    axis.setAttribute("y2", svgHeight - axisHeight);
    axis.setAttribute("stroke", "#aaa");
    axis.setAttribute("stroke-width", "1");
    axis.setAttribute("id", id++);
    svg.appendChild(axis);

    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    await displayNextBit(svg, bitWidth / 2, svgHeight - bitHeight, bitsArray[0])
    let isActive = Boolean(true);
    let y1 = svgHeight;
    let y2 = svgHeight;
    let x1 = bitWidth;
    let x2 = 2 * bitWidth;
    let pulseWidth = bitWidth / 2;
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];

        if (bitValue === "1")
            isActive = !isActive;
        if (isActive) {
            x1 = i * bitWidth;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - lowerLimit;
            y2 = svgHeight - lowerLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
            y2 = svgHeight - upperLimit;
            await drawVerticalLineWithTransition(svg, x2, y1, x2, y2, 250);
            x1 = x2;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - upperLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
        } else {
            x1 = i * bitWidth;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - upperLimit;
            y2 = svgHeight - upperLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
            y2 = svgHeight - lowerLimit;
            await drawVerticalLineWithTransition(svg, x2, y1, x2, y2, 250);
            x1 = x2;
            x2 = x1 + pulseWidth;
            y1 = svgHeight - lowerLimit;
            await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 250);
        }


        const dottedX1 = (i + 1) * bitWidth;
        const dottedY1 = svgHeight - upperDottedLimit;
        const dottedX2 = (i + 1) * bitWidth;
        const dottedY2 = svgHeight - lowerDottedLimit;
        await await drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);

        // Display Next bitValue 
        if (i !== bitsArray.length - 1)
            await displayNextBit(svg, x2 + bitWidth / 2, svgHeight - bitHeight, bitsArray[i + 1])

        x1 = i * bitWidth;
        if (bitsArray[i + 1] === "0" && i != bitsArray.length - 1) {
            const verticalX1 = x2;
            const verticalX2 = x2;
            let verticalY1 = svgHeight - lowerLimit;
            let verticalY2 = svgHeight - upperLimit;
            if (y1 == svgHeight - upperLimit) {
                verticalY1 = svgHeight - upperLimit;
                verticalY2 = svgHeight - lowerLimit;
            }
            await drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2, 200);
        }
        else await waitForVerticalLine(svg, dottedX1, dottedY1, dottedX2, dottedY2, 200);

    }
}

async function drawAMI(bitsArray) {
    let id = 0;

    const svg = document.getElementById("ami-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    initalLine.setAttribute("x1", 1.5);
    initalLine.setAttribute("x2", 1.5);
    if (bitsArray[0] === "1") {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - upperLimit);
    } else {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - axisHeight);
    }
    initalLine.setAttribute("stroke", "#000");
    initalLine.setAttribute("stroke-width", "2");
    initalLine.setAttribute("id", id++);
    svg.appendChild(initalLine);

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", 0);
    axis.setAttribute("x2", svgWidth);
    axis.setAttribute("y1", svgHeight - axisHeight);
    axis.setAttribute("y2", svgHeight - axisHeight);
    axis.setAttribute("stroke", "#aaa");
    axis.setAttribute("stroke-width", "1");
    axis.setAttribute("id", id++);
    svg.appendChild(axis);

    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    await displayNextBit(svg, bitWidth / 2, svgHeight - bitHeight, bitsArray[0])
    let isActive = Boolean(false);
    let y1 = svgHeight;
    let y2 = svgHeight;
    let x1 = bitWidth;
    let x2 = 2 * bitWidth;
    let pulseWidth = bitWidth / 2;
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];

        x1 = i * bitWidth;
        x2 = (i + 1) * bitWidth;
        if (bitValue === "1") {
            isActive = !isActive;
            if (isActive) {
                y1 = svgHeight - upperLimit;
                y2 = svgHeight - upperLimit;
            } else {
                y1 = svgHeight - lowerLimit;
                y2 = svgHeight - lowerLimit;
            }
        } else {
            y1 = svgHeight - axisHeight;
            y2 = svgHeight - axisHeight;
        }
        await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 750);


        const dottedX1 = (i + 1) * bitWidth;
        const dottedY1 = svgHeight - upperDottedLimit;
        const dottedX2 = (i + 1) * bitWidth;
        const dottedY2 = svgHeight - lowerDottedLimit;
        await await drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);

        // Display Next bitValue 
        if (i !== bitsArray.length - 1)
            await displayNextBit(svg, x2 + bitWidth / 2, svgHeight - bitHeight, bitsArray[i + 1])

        const verticalX1 = x2;
        const verticalX2 = x2;
        let verticalY1 = svgHeight - axisHeight;
        let verticalY2 = svgHeight - axisHeight;
        if (i != bitsArray.length - 1) {
            if (bitsArray[i] === "1") {
                if (bitsArray[i + 1] === "0") {
                    if (y1 == svgHeight - lowerLimit)
                        verticalY1 = svgHeight - lowerLimit;
                    else
                        verticalY1 = svgHeight - upperLimit;
                } else {
                    if (y1 == svgHeight - lowerLimit) {
                        verticalY1 = svgHeight - lowerLimit;
                        verticalY2 = svgHeight - upperLimit;
                    }
                    else {
                        verticalY1 = svgHeight - upperLimit;
                        verticalY2 = svgHeight - lowerLimit;
                    }
                }
                await drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2, 250);
            }
            else {
                if (bitsArray[i + 1] === "1") {
                    if (isActive)
                        verticalY2 = svgHeight - lowerLimit;
                    else
                        verticalY2 = svgHeight - upperLimit;
                    await drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2, 250);
                } else
                    await waitForVerticalLine(svg, dottedX1, dottedY1, dottedX2, dottedY2, 250);
            }
        }

    }
}

async function drawPseudoternary(bitsArray) {
    let id = 0;

    const svg = document.getElementById("pseudoternary-svg");
    svg.innerHTML = ""; // Clear any previous content in the SVG

    const svgWidth = svg.clientWidth - 2; // Get the width of the SVG element
    const svgHeight = svg.clientHeight; // Get the height of the SVG element

    const bitWidth = svgWidth / bitsArray.length;

    // Create a initial line element and set its attributes
    const initalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    initalLine.setAttribute("x1", 1.5);
    initalLine.setAttribute("x2", 1.5);
    if (bitsArray[0] === "0") {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - upperLimit);
    } else {
        initalLine.setAttribute("y1", svgHeight - axisHeight);
        initalLine.setAttribute("y2", svgHeight - axisHeight);
    }
    initalLine.setAttribute("stroke", "#000");
    initalLine.setAttribute("stroke-width", "2");
    initalLine.setAttribute("id", id++);
    svg.appendChild(initalLine);

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", 0);
    axis.setAttribute("x2", svgWidth);
    axis.setAttribute("y1", svgHeight - axisHeight);
    axis.setAttribute("y2", svgHeight - axisHeight);
    axis.setAttribute("stroke", "#aaa");
    axis.setAttribute("stroke-width", "1");
    axis.setAttribute("id", id++);
    svg.appendChild(axis);

    // Loop through the bitsArray and draw lines based on the bit values (0 or 1)
    await displayNextBit(svg, bitWidth / 2, svgHeight - bitHeight, bitsArray[0])
    let isActive = Boolean(false);
    let y1 = svgHeight;
    let y2 = svgHeight;
    let x1 = bitWidth;
    let x2 = 2 * bitWidth;
    for (let i = 0; i < bitsArray.length; i++) {
        const bitValue = bitsArray[i];

        x1 = i * bitWidth;
        x2 = (i + 1) * bitWidth;
        if (bitValue === "0") {
            isActive = !isActive;
            if (isActive) {
                y1 = svgHeight - upperLimit;
                y2 = svgHeight - upperLimit;
            } else {
                y1 = svgHeight - lowerLimit;
                y2 = svgHeight - lowerLimit;
            }
        } else {
            y1 = svgHeight - axisHeight;
            y2 = svgHeight - axisHeight;
        }
        await drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, 750);


        const dottedX1 = (i + 1) * bitWidth;
        const dottedY1 = svgHeight - upperDottedLimit;
        const dottedX2 = (i + 1) * bitWidth;
        const dottedY2 = svgHeight - lowerDottedLimit;
        await await drawDottedLineWithTransition(svg, dottedX1, dottedY1, dottedX2, dottedY2);

        // Display Next bitValue 
        if (i !== bitsArray.length - 1)
            await displayNextBit(svg, x2 + bitWidth / 2, svgHeight - bitHeight, bitsArray[i + 1])

        const verticalX1 = x2;
        const verticalX2 = x2;
        let verticalY1 = svgHeight - axisHeight;
        let verticalY2 = svgHeight - axisHeight;
        if (i != bitsArray.length - 1) {
            if (bitsArray[i] === "0") {
                if (bitsArray[i + 1] === "1") {
                    if (y1 == svgHeight - lowerLimit)
                        verticalY1 = svgHeight - lowerLimit;
                    else
                        verticalY1 = svgHeight - upperLimit;
                } else {
                    if (y1 == svgHeight - lowerLimit) {
                        verticalY1 = svgHeight - lowerLimit;
                        verticalY2 = svgHeight - upperLimit;
                    }
                    else {
                        verticalY1 = svgHeight - upperLimit;
                        verticalY2 = svgHeight - lowerLimit;
                    }
                }
                await drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2, 250);
            }
            else {
                if (bitsArray[i + 1] === "0") {
                    if (isActive)
                        verticalY2 = svgHeight - lowerLimit;
                    else
                        verticalY2 = svgHeight - upperLimit;
                    await drawVerticalLineWithTransition(svg, verticalX1, verticalY1, verticalX2, verticalY2, 250);
                } else
                    await waitForVerticalLine(svg, dottedX1, dottedY1, dottedX2, dottedY2, 250);
            }
        }

    }
}

// Line Draw Animation's
async function drawHorizontalLineWithTransition(svg, x1, y1, x2, y2, duration) {
    const bitLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    bitLine.setAttribute("x1", x1);
    bitLine.setAttribute("y1", y1);
    bitLine.setAttribute("x2", x1); // Start the horizontal line at the same point to create the draw effect
    bitLine.setAttribute("y2", y1);
    bitLine.setAttribute("stroke", "#000");
    bitLine.setAttribute("stroke-width", "2");
    svg.appendChild(bitLine);

    let start = null;

    // Wrap the requestAnimationFrame in a Promise to be able to use await
    function animateHorizontalLine(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Calculate the new x2 coordinate for the horizontal line to create the draw effect
        const newX2 = x1 + (progress / duration) * (x2 - x1);
        bitLine.setAttribute("x2", newX2);

        // Continue the animation until the duration is reached
        if (progress < duration) {
            requestAnimationFrame(animateHorizontalLine);
        } else {
            // If the animation is done, set the x2 coordinate to its final value
            bitLine.setAttribute("x2", x2);
        }
    }

    // Wrap the requestAnimationFrame in a Promise to be able to use await
    return new Promise((resolve) => {
        function animationWrapper(timestamp) {
            animateHorizontalLine(timestamp);
            if (bitLine.getAttribute("x2") === String(x2)) {
                // Animation is completed, resolve the Promise
                resolve();
            } else {
                // Continue animating
                requestAnimationFrame(animationWrapper);
            }
        }
        requestAnimationFrame(animationWrapper);
    });
}

async function drawVerticalLineWithTransition(svg, x1, y1, x2, y2, duration) {
    const verticalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    verticalLine.setAttribute("x1", x1);
    verticalLine.setAttribute("y1", y1);
    verticalLine.setAttribute("x2", x1);
    verticalLine.setAttribute("y2", y1); // Start the vertical line at the same point to create the draw effect
    verticalLine.setAttribute("stroke", "#000");
    verticalLine.setAttribute("stroke-width", "2");
    svg.appendChild(verticalLine);

    let start = null;

    // Wrap the requestAnimationFrame in a Promise to be able to use await
    function animateVerticalLine(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Calculate the new y2 coordinate for the vertical line to create the draw effect
        const newY2 = y1 + (progress / duration) * (y2 - y1);
        verticalLine.setAttribute("y2", newY2);

        // Continue the animation until the duration is reached
        if (progress < duration) {
            requestAnimationFrame(animateVerticalLine);
        } else {
            // If the animation is done, set the y2 coordinate to its final value
            verticalLine.setAttribute("y2", y2);
        }
    }

    // Wrap the requestAnimationFrame in a Promise to be able to use await
    return new Promise((resolve) => {
        function animationWrapper(timestamp) {
            animateVerticalLine(timestamp);
            if (verticalLine.getAttribute("y2") === String(y2)) {
                // Animation is completed, resolve the Promise
                resolve();
            } else {
                // Continue animating
                requestAnimationFrame(animationWrapper);
            }
        }
        requestAnimationFrame(animationWrapper);
    });
}

async function waitForVerticalLine(svg, x1, y1, x2, y2, duration) {
    const verticalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    verticalLine.setAttribute("x1", x1);
    verticalLine.setAttribute("y1", y1);
    verticalLine.setAttribute("x2", x1);
    verticalLine.setAttribute("y2", y1); // Start the vertical line at the same point to create the draw effect
    verticalLine.setAttribute("stroke", "transparent");
    verticalLine.setAttribute("stroke-width", "2");
    svg.appendChild(verticalLine);

    let start = null;

    // Wrap the requestAnimationFrame in a Promise to be able to use await
    function animateVerticalLine(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Calculate the new y2 coordinate for the vertical line to create the draw effect
        const newY2 = y1 + (progress / duration) * (y2 - y1);
        verticalLine.setAttribute("y2", newY2);

        // Continue the animation until the duration is reached
        if (progress < duration) {
            requestAnimationFrame(animateVerticalLine);
        } else {
            // If the animation is done, set the y2 coordinate to its final value
            verticalLine.setAttribute("y2", y2);
        }
    }

    // Wrap the requestAnimationFrame in a Promise to be able to use await
    return new Promise((resolve) => {
        function animationWrapper(timestamp) {
            animateVerticalLine(timestamp);
            if (verticalLine.getAttribute("y2") === String(y2)) {
                // Animation is completed, resolve the Promise
                resolve();
            } else {
                // Continue animating
                requestAnimationFrame(animationWrapper);
            }
        }
        requestAnimationFrame(animationWrapper);
    });
}

async function drawDottedLineWithTransition(svg, x1, y1, x2, y2) {
    const dottedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    dottedLine.setAttribute("x1", x1);
    dottedLine.setAttribute("y1", y1);
    dottedLine.setAttribute("x2", x1);
    dottedLine.setAttribute("y2", y1);
    dottedLine.setAttribute("stroke", "#000");
    dottedLine.setAttribute("stroke-width", "1");
    dottedLine.setAttribute("stroke-dasharray", "4, 4");
    svg.appendChild(dottedLine);

    const duration = 200;
    let start = null;

    function animateDottedLine(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        const newY2 = y1 + (progress / duration) * (y2 - y1);
        dottedLine.setAttribute("y2", newY2);

        if (progress < duration) {
            requestAnimationFrame(animateDottedLine);
        } else {
            dottedLine.setAttribute("y2", y2);
        }
    }
    return new Promise((resolve) => {
        function animationWrapper(timestamp) {
            animateDottedLine(timestamp);
            if (dottedLine.getAttribute("y2") === String(y2)) {
                resolve();
            } else {
                requestAnimationFrame(animationWrapper);
            }
        }
        requestAnimationFrame(animationWrapper);
    });
}

async function displayNextBit(svg, x, y, bitValue) {
    await animationDelay(200);
    const bitValueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    bitValueText.setAttribute("x", x);
    bitValueText.setAttribute("y", y); // Adjust the value as needed for positioning
    bitValueText.setAttribute("text-anchor", "middle");
    bitValueText.setAttribute("fill", "#000");
    bitValueText.textContent = bitValue;
    svg.appendChild(bitValueText);

    await animationDelay(400);
}

async function animationDelay(delay) {
    await new Promise((resolve) => setTimeout(resolve, delay));
}
