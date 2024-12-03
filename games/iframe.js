// Listen for messages from the parent
window.addEventListener('message', (event) => {
    // Ensure the message comes from the trusted parent
    if (event.origin !== "https://vekislav.github.io") {
        // Ignore untrusted sources
        return;
    }

    const data = event.data;

    // Handle incoming messages from the parent
    if (data.type === 'balance') {
        console.log('Balance received from parent:', data.value);
        // You can update the iframe page or use the balance as needed
    } else if (data.type === 'urlChanged') {
        console.log('Parent changed the iframe URL:', data.value);
    }
});

// Send message to the parent
function sendToParent(action, details) {
    const message = {
        type: 'userAction',
        action: action,
        details: details
    };

    window.parent.postMessage(message, '*');
}
