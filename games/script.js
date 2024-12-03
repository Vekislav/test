document.addEventListener('DOMContentLoaded', (event) => {
    updateBalance();
    document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);

    // Send balance to iframe on load
    sendToIframe({ type: 'balance', value: localStorage.getItem('slotsBalance') || 0 });

    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
        if (event.origin !== "http://localhost/") {
            // Ensure the message comes from a trusted origin
            return;
        }

        const data = event.data;

        // Handle incoming messages from iframe
        if (data.type === 'userAction') {
            console.log('User action received in parent:', data.details);
        }
    });

 // Parent page - updateBalance function
	function updateBalance() {
		let balance = localStorage.getItem('slotsBalance') || 0;  // Default to 0 if not set
		document.getElementById('balance-amount').innerText = balance;
	}

    }

    // Toggle sidebar visibility
    function toggleSidebar() {
        let sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    }

    // Function to change iframe source
    window.loadIframe = function(url) {
        const iframe = document.getElementById('iframe');
        iframe.src = url;
        
        // Send a message to iframe when URL is changed
        sendToIframe({ type: 'urlChanged', value: url });
    }

    // Function to send messages to iframe
    function sendToIframe(message) {
        const iframe = document.getElementById('iframe');
        iframe.contentWindow.postMessage(message, '*');
    }
});
