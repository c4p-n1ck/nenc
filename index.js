relay_url = "wss://relayable.org";
nostr = window.nostr;
relay = new Relay(relay_url);

document.addEventListener("DOMContentLoaded", e => {
	document.querySelector('.relay').value = relay_url;
});

log = content => {
	document.querySelector('.log').innerText += content + "\n";
}

noseauth = async () => {
	author = await nostr.getPublicKey();
}

nosrecon = () => {
	let input_relay_url = document.querySelector('.relay').value;
	relay.close();
	relay = new Relay(input_relay_url);
	// TODO: fix new [relay.onmessage, relay.onopen] handler using classes to connect to a relay.
}

rsend = () => {
	let payload = document.querySelector('textarea').value;
	relay.send(payload);
}

clear_log = () => {
	document.querySelector('.log').innerText = '';
}
