document.addEventListener("DOMContentLoaded", function () {
    // Add click event listener to the button
    const modifyBtn = document.getElementById("modify-btn");
    modifyBtn.addEventListener("click", changeOrientation);

    const addLineBtn = document.getElementById("add-line-btn");
    addLineBtn.addEventListener("click", addLine);

    // Function to change the line orientation
    function changeOrientation() {
        const svgLine = document.querySelector("#l1");

        // Check the current orientation (horizontal or vertical)
        const isHorizontal = svgLine.getAttribute("y1") === svgLine.getAttribute("y2");

        if (isHorizontal) {
            // Change to vertical
            svgLine.setAttribute("y1", "10");
            svgLine.setAttribute("y2", "90");
        } else {
            // Change to horizontal
            svgLine.setAttribute("y1", "50");
            svgLine.setAttribute("y2", "50");
        }
    }

    // Function to add a new line with random coordinates
    function addLine() {
        const svg = document.getElementById("my-svg");
        const newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

        // Generate random coordinates for the new line within the range [10, 550] for x and [10, 550] for y
        const x1 = Math.floor(Math.random() * 441) + 10;
        const y1 = Math.floor(Math.random() * 441) + 10;
        const x2 = Math.floor(Math.random() * 441) + 10;
        const y2 = Math.floor(Math.random() * 441) + 10;

        newLine.setAttribute("x1", x1);
        newLine.setAttribute("y1", y1);
        newLine.setAttribute("x2", x2);
        newLine.setAttribute("y2", y2);
        newLine.setAttribute("stroke", "blue");
        newLine.setAttribute("stroke-width", "2");
        newLine.classList.add("animate-line"); // Add the class for animation
        svg.appendChild(newLine);

        // Trigger the animation by resetting the dash offset
        requestAnimationFrame(() => {
            newLine.style.strokeDashoffset = "0";
        });
    }
});
