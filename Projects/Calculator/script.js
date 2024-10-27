$(document).ready(function() {
    let $input = $('#inputBox');
    let string = "";

    function updateInput() {
        $input.val(string);
    }

    $('.button').on('click', function(event) {
        // Prevent default focus behavior when clicking buttons
        event.preventDefault();
        event.stopPropagation();

        const buttonValue = $(this).text();

        if (buttonValue === '=') {
            try {
                if (!string) {
                    // throw new Error("No input");
                    throw new Error("");
                }
                const result = eval(string);
                if (result === undefined) {
                    // throw new Error("Undefined result");
                    throw new Error("");
                }
                string = result.toString();
            } catch (e) {
                // string = "Error: " + e.message;
                string = "";
            }
            updateInput();
        } else if (buttonValue === 'AC') {
            string = "";
            updateInput();
        } else if (buttonValue === 'DEL') {
            string = string.substring(0, string.length - 1);
            updateInput();
        } else {
            // Handle operator input
            const isCurrentInputOperator = /[\+\-\*\/%]/.test(buttonValue);
            
            if (string.length === 0) {
                // If the input is an operator and it's the first input
                if (isCurrentInputOperator) {
                    // Start with '0' followed by the operator
                    string = '0' + buttonValue;
                } else {
                    string += buttonValue; // Append number
                }
            } else {
                const lastChar = string.slice(-1);
                const isLastCharOperator = /[\+\-\*\/%]/.test(lastChar);

                // Prevent multiple operators
                if (isLastCharOperator && isCurrentInputOperator) {
                    string = string.slice(0, -1) + buttonValue; // Replace last operator
                } else {
                    string += buttonValue; // Append the input
                }
            }
            updateInput();
        }
    });

    $(document).on('keydown', function(e) {
        const key = e.key;

        // Check if the key is a number or an operator
        if ($.isNumeric(key) || ['+', '-', '*', '/', '%'].includes(key)) {
            const isCurrentInputOperator = /[\+\-\*\/%]/.test(key);

            if (string.length === 0) {
                // If the input is an operator and it's the first input
                if (isCurrentInputOperator) {
                    // Start with '0' followed by the operator
                    string = '0' + key;
                } else {
                    string += key; // Append number
                }
            } else {
                const lastChar = string.slice(-1);
                const isLastCharOperator = /[\+\-\*\/%]/.test(lastChar);

                // Prevent multiple operators
                if (isLastCharOperator && isCurrentInputOperator) {
                    string = string.slice(0, -1) + key; // Replace last operator
                } else {
                    string += key; // Append the input
                }
            }
            updateInput();
        } else if (key === 'Enter') {
            try {
                if (!string) {
                    // throw new Error("No input");
                    throw new Error("");
                }
                const result = eval(string);
                if (result === undefined) {
                    // throw new Error("Undefined result");
                    throw new Error("");
                }
                string = result.toString();
            } catch (e) {
                // string = "Error: " + e.message;
                string = "";
            }
            updateInput();
        } else if (key === 'Backspace') {
            string = string.substring(0, string.length - 1);
            updateInput();
        } else if (key === 'Escape') {
            string = "";
            updateInput();
        }
    });

    // $('#modeToggle').on('click', function(event) {
    //     event.preventDefault(); // Prevent default behavior
    //     event.stopPropagation(); // Stop event from bubbling up
    //     $('body').toggleClass('light-mode');

    //     // Ensure the input doesn't get focused
    //     $input.blur(); // Explicitly blur the input
    // });

    $('#toggleSwitch').on('change', function() {
        $('body').toggleClass('light-mode');
    });
});
