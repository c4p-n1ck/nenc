class Relay {
        constructor(relay_url) {
                this.relay_url = relay_url;
                this.relay = new WebSocket(relay_url);
                this.relay.onopen = () => {
                        // log(`[+] Connected to ${this.relay_url}`);
                        this.relay.send(JSON.stringify(["REQ","TEST",{"kinds":[0],"limit": 4}]));
                }
                this.relay.onmessage = event => {
                        let data = JSON.parse(event.data);
                        if ( data[0] === "EOSE" ) {
                                this.relay.send( JSON.stringify( ["CLOSE", data[1]] ) )
                        } /* else if ( data[2].kind === 4 ) {
                                let payload = data[2];
                                let k = payload.tags[0][1];
                                nostr.nip04.decrypt(k, payload.content).then( txt => {
                                        data[2].content = txt;
                                        document.querySelector('.log').innerText += JSON.stringify(data) + "\n";
                                })
                        } */
                        // document.querySelector('.log').innerText += event.data + "\n";
                        log(event.data);
                }
        }
        send(payload) {
                this.relay.send(payload);
        }
        close() {
                this.relay.close();
        }
}
