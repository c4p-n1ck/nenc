relay_url = "wss://relayable.org";
nostr = window.nostr;
relay = new WebSocket(relay_url);

noseauth = async () => {
	author = await nostr.getPublicKey();
}

nosrecon = () => {
	// specific relay usage stuff [TODO]
}

rsend = () => {
	let payload = document.querySelector('textarea').value;
	relay.send(payload);
}

relay.onmessage = event => {
	let data = JSON.parse(event.data);
	if ( data[0] === "EOSE" ) {
		relay.send( JSON.stringify( ["CLOSE", data[1]] ) )
	} /* else if ( data[2].kind === 4 ) {
		let payload = data[2];
		let k = payload.tags[0][1];
		nostr.nip04.decrypt(k, payload.content).then( txt => {
			data[2].content = txt;
			document.querySelector('.log').innerText += JSON.stringify(data) + "\n";
		})
	} */
	document.querySelector('.log').innerText += event.data + "\n";
}

relay.onopen = () => {
	relay.send(JSON.stringify(["REQ","TEST",{"kinds":[0],"limit": 4}]));
}
