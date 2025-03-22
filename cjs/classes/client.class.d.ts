export default class Client {
    private heartbeatInterval;
    private heartbeatTimeout?;
    private url?;
    private reconnectTimeout?;
    private socket?;
    private handshake?;
    private waitingForHandshake;
    private requestId;
    private pendingRequests;
    private handlers;
    /**
     * Connette il WebSocket
     * @param url L'url al quale connettersi. Obbligatorio alla prima connessione.
     * @param reconnectTimeout Opzionale, indica il periodo di tempo in ms prima di ritentare la connessione. Se non specificato, mantiene l'ultimo valore inserito.
     * @param handshake Opzionale, le informazioni da inviare all'handshake
     */
    connect(url?: string | undefined, { handshake, reconnectTimeout }?: {
        handshake?: any;
        reconnectTimeout?: number | null;
    }): Promise<void>;
    /**
     * Disconnette il WebSocket
     * @param code Il codice di stato con il quale chiudere la connessione
     * @param reason La ragione per il quale la connessione è stata chiusa
     */
    disconnect(code?: number, reason?: string): Promise<void>;
    /**
     * Ottiene lo stato attuale del WebSocket
     */
    get status(): 'connecting' | 'handshake' | 'open' | 'closing' | 'closed';
    /**
     * Funzione di supporto interna
     * Richiamata alla connessione o all'arrivo di ping o messaggi.
     * Verifica che i ping del server arrivino e che, quindi, il WebSocket sia ancora connesso.
     */
    private checkHeartbeat;
    /**
     * Solleva un'evento e invia la richiesta al client
     * @param eventName Il nome dell'evento
     * @param payload Il payload da mandare con l'evento; Sarà il primo parametro della funzione richiamata dal server
     * @param callback La funzione di callback; se presente, richiede una risposta al server e richiama il callback con la risposta come parametro
     * @param requestTimeout Opzionale, il tempo in ms dopo il quale considerare la richiesta in timeout
     */
    emit(eventName: string, payload: any, callback?: (response: any) => void, requestTimeout?: number): void;
    /**
     * Funzione di supporto interna
     * Decodifica i dati in arrivo e gestire richieste e risposte asincrone
     */
    private handle;
    /**
     * Funzione di supporto interna
     * Richiamata prima di emettere un evento e convertire i dati in un Uint8Array come JSON
     * @param data I dati da codificare in un buffer
     * @returns L'Uint8Array rappresentante i dati in JSON
     */
    private encode;
    /**
     * Funzione di supporto interna
     * Richiamata dopo aver ricevuto una richiesta o una risposta dal WebSocket
     * @param data L'Uint8Array da decodificare
     * @returns Il dato originale, tratto dal contenuto in JSON del messaggio
     */
    private decode;
    /**
     * Aggiunge un handler ad un dato evento
     * @param type Il tipo di evento
     * @param handler La funzione da richiamare all'emmissione dell'evento
     */
    on(type: 'open', handler: (event: Event) => void): void;
    on(type: 'error', handler: (event: Event) => void): void;
    on(type: 'close', handler: (event: CloseEvent) => void): void;
    on(type: string, handler: (data: any) => any): void;
    /**
     * Rimuove un handler da un dato evento
     * @param type Il tipo di evento
     * @param handler La funzione da rimuovere o, se non specificata, rimuove tutti gli handler
     */
    off(type: 'open', handler?: (event: Event) => void): void;
    off(type: 'error', handler?: (event: Event) => void): void;
    off(type: 'close', handler?: (event: CloseEvent) => void): void;
    off(type: string, handler?: (data: any) => any): void;
    /**
     * Funzione di supporto interna
     * Solleva un'evento richiamando tutti gli handler ad esso associati
     * @param type Il tipo di evento
     * @param data Il parametro da passare agli handler
     */
    private raise;
}
