export interface City {
  id: string;
  name: string;
  region: string;
  description: string;
  request_url: string;
  needs_display: boolean;
  free_parking: boolean;
  coordinates: [number, number];
  duration?: string;
  office_address?: string;
  office_hours?: string;
  phone?: string;
  email?: string;
  parking_zones_description?: string;
  ztl_access_description?: string;
  cost?: string;
  payment_method?: string;
  required_documents?: string;
  requirements?: string;
  notes?: string;
}

export const cities: City[] = [
  {
    id: "roma",
    name: "Roma",
    region: "Lazio",
    description:
      "ZTL del centro storico di Roma con regole specifiche per veicoli elettrici",
    request_url:
      "https://romamobilita.it/it/servizi/ztl/accesso-ztl-veicoli-totalmente-elettrici",
    needs_display: true,
    free_parking: true,
    coordinates: [12.4964, 41.9028],
    duration: "Illimitata",
    office_address:
      "Roma Servizi per la Mobilità, Piazzale degli Archivi 40, 00144 Roma",
    office_hours: "Lunedì-Venerdì 8:30-16:30",
    phone: "+39 06 57003",
    email: "permessiztl@romamobilita.it",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente nelle strisce blu previa registrazione",
    ztl_access_description:
      "I veicoli elettrici possono accedere a tutte le ZTL del centro storico di Roma previa registrazione",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione del veicolo, documento d'identità, codice fiscale del proprietario",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Per i veicoli elettrici è necessario comunque richiedere il permesso specifico",
  },
  {
    id: "milano",
    name: "Milano",
    region: "Lombardia",
    description:
      "Area C e Area B di Milano con accesso gratuito per veicoli elettrici e sosta agevolata previa richiesta di permesso",
    request_url:
      "https://www.comune.milano.it/aree-tematiche/mobilita/area-c/area-c-veicoli-elettrici",
    needs_display: false,
    free_parking: true,
    coordinates: [9.19, 45.4642],
    duration: "5 anni (per la sosta); accesso Area C automatico",
    office_address: "ATM Point Duomo, Piazza Duomo 19A, 20121 Milano",
    office_hours: "Lunedì–Sabato 8:15–19:00",
    phone: "+39 02 48684001 (tasto 1 poi 3)",
    email: "MTA.UfficioAreaC@comune.milano.it",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente nelle strisce blu e gialle (riservate ai residenti) previa richiesta del pass 'Sosta Elettrici'",
    ztl_access_description:
      "I veicoli elettrici accedono gratuitamente all'Area C senza necessità di registrazione preventiva; il sistema riconosce automaticamente la targa al primo passaggio",
    cost: "16€ per marca da bollo (solo per il pass sosta)",
    payment_method: "Marca da bollo cartacea da allegare alla richiesta sosta",
    required_documents:
      "Carta di circolazione del veicolo, documento d'identità, marca da bollo da 16€ (solo per sosta)",
    requirements: "Veicolo con alimentazione esclusivamente elettrica (BEV)",
    notes:
      "Per l’Area C non è necessaria alcuna registrazione preventiva: il sistema rileva automaticamente le targhe dei veicoli elettrici. Il pass per la sosta gratuita va richiesto separatamente.",
  },
  {
    id: "firenze",
    name: "Firenze",
    region: "Toscana",
    description:
      "ZTL del centro storico di Firenze con regole specifiche per veicoli elettrici",
    request_url: "https://servizi.comune.fi.it/servizi/scheda-servizio/ztl",
    needs_display: true,
    free_parking: true,
    coordinates: [11.2558, 43.7696],
    duration: "5 anni",
    office_address: "Servizio Mobilità, Via Mannelli 119/i, 50132 Firenze",
    office_hours:
      "Lunedì, Mercoledì, Venerdì 9:00-12:30; Martedì e Giovedì 9:00-12:30 e 15:00-17:00",
    phone: "+39 055 0556554",
    email: "contrassegni.ztl@comune.fi.it",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL senza limitazioni di orario previa autorizzazione",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, codice fiscale",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Il contrassegno deve essere esposto sul parabrezza in modo visibile",
  },
  {
    id: "bologna",
    name: "Bologna",
    region: "Emilia-Romagna",
    description:
      "ZTL del centro storico di Bologna con regole specifiche per veicoli elettrici",
    request_url:
      "https://www.comune.bologna.it/servizi-informazioni/accesso-sosta-veicoli-elettrici",
    needs_display: true,
    free_parking: true,
    coordinates: [11.3426, 44.4949],
    duration: "5 anni",
    office_address:
      "Sportello Mobilità Urbana, Piazza Liber Paradisus 10, 40129 Bologna",
    office_hours:
      "Lunedì-Venerdì 8:30-13:00; Martedì e Giovedì anche 15:00-17:00",
    phone: "+39 051 2193042",
    email: "contrassegni@comune.bologna.it",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente nelle strisce blu",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL e nelle aree pedonali per carico/scarico",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents: "Carta di circolazione, documento d'identità",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Necessario registrare la targa ed esporre il contrassegno 'VEICOLO ELETTRICO'",
  },
  {
    id: "torino",
    name: "Torino",
    region: "Piemonte",
    description:
      "ZTL Centrale di Torino con accesso consentito ai veicoli elettrici previa autorizzazione; sosta a pagamento anche per elettrici",
    request_url: "http://www.comune.torino.it/trasporti/ztl/",
    needs_display: false,
    free_parking: false,
    coordinates: [7.6868, 45.0703],
    duration: "Permanente per veicoli elettrici",
    office_address: "GTT - Corso Turati 19/6, 10128 Torino",
    office_hours:
      "Lunedì–Venerdì 8:30–12:30; Martedì e Giovedì anche 14:00–17:00",
    phone: "+39 011 5764733",
    email: "permessiztl@gtt.to.it",
    parking_zones_description:
      "Il parcheggio nelle strisce blu è a pagamento anche per i veicoli elettrici",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL Centrale previa autorizzazione",
    cost: "Gratuito, salvo due marche da bollo da 16€ ciascuna",
    payment_method: "Marca da bollo cartacea da allegare alla richiesta",
    required_documents:
      "Carta di circolazione, documento d'identità, due marche da bollo da 16€",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Non sono previste esenzioni per la sosta. Il permesso ZTL richiede due marche da bollo; la targa deve essere registrata nel sistema.",
  },
  {
    id: "napoli",
    name: "Napoli",
    region: "Campania",
    description:
      "Accesso alla ZTL e sosta agevolata per veicoli elettrici a Napoli, previa autorizzazione specifica",
    request_url: "https://www.comune.napoli.it/veicoli-elettrici-ibridi",
    needs_display: true,
    free_parking: true,
    coordinates: [14.2681, 40.8518],
    duration: "2 anni",
    office_address: "ANM - Via G. Marino 1, 80125 Napoli",
    office_hours:
      "Lunedì, Mercoledì, Venerdì 9:00–13:00; Martedì e Giovedì 9:00–13:00 e 14:00–16:00",
    phone: "+39 081 7632182",
    email: "permessiztl@anm.it",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente sulle strisce blu, esclusi i parcheggi a rotazione, in struttura e car-valet",
    ztl_access_description:
      "L’accesso alla ZTL è consentito solo previa autorizzazione con rilascio del contrassegno elettronico",
    cost: "€10 per diritti di segreteria (rilascio permesso)",
    payment_method: "Pagamento tramite bonifico o presso lo sportello ANM",
    required_documents:
      "Carta di circolazione, documento d’identità, codice fiscale, modulo di richiesta",
    requirements: "Veicolo alimentato esclusivamente a energia elettrica (BEV)",
    notes:
      "Il contrassegno è elettronico e non deve essere esposto. Il permesso è valido per due anni. La targa deve essere correttamente registrata per evitare sanzioni.",
  },
  {
    id: "palermo",
    name: "Palermo",
    region: "Sicilia",
    description:
      "ZTL Centro Storico di Palermo con regole specifiche per veicoli elettrici",
    request_url: "https://ztl.comune.palermo.it/",
    needs_display: false,
    free_parking: true,
    coordinates: [13.3613, 38.1157],
    duration: "5 anni",
    office_address:
      "Comando di Polizia Municipale, Via Ugo La Malfa 72, 90146 Palermo",
    office_hours: "Lunedì-Venerdì 9:00-12:00; Mercoledì anche 15:00-17:00",
    phone: "+39 091 6954706",
    email: "ztl@comune.palermo.it",
    ztl_access_description:
      "I veicoli elettrici hanno accesso gratuito alla ZTL previa registrazione",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, codice fiscale",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "È necessario registrare la targa del veicolo elettrico nel sistema di controllo",
  },
  {
    id: "verona",
    name: "Verona",
    region: "Veneto",
    description:
      "ZTL del centro storico di Verona con regole specifiche per veicoli elettrici",
    request_url: "https://www.comune.verona.it/nqcontent.cfm?a_id=41864",
    needs_display: false,
    free_parking: false,
    coordinates: [10.9916, 45.4384],
    duration: "3 anni",
    office_address: "Ufficio Permessi ZTL, Via Campo Marzo 8, 37122 Verona",
    office_hours:
      "Lunedì-Venerdì 8:30-13:00; Martedì e Giovedì anche 14:30-16:30",
    phone: "+39 045 8079341",
    email: "permessiztl@comune.verona.it",
    parking_zones_description: "Non sono previste agevolazioni",
    ztl_access_description: "I veicoli elettrici possono accedere alla ZTL",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, codice fiscale",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes: "",
  },
  {
    id: "genova",
    name: "Genova",
    region: "Liguria",
    description:
      "ZTL Centro Storico di Genova con regole specifiche per veicoli elettrici",
    request_url: "https://smart.comune.genova.it/contenuti/ztl-centro-storico",
    needs_display: false,
    free_parking: true,
    coordinates: [8.9463, 44.4049],
    duration: "Permanente",
    office_address:
      "Genova Parcheggi, Viale Brigate Partigiane 1, 16129 Genova",
    office_hours: "Lunedì-Venerdì 8:30-16:30",
    phone: "+39 010 5411763",
    email: "permessiztl@genovaparcheggi.it",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente nelle strisce blu",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL previa registrazione della targa",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, codice fiscale",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "È necessario registrare la targa del veicolo elettrico nel sistema di controllo",
  },
  {
    id: "padova",
    name: "Padova",
    region: "Veneto",
    description:
      "ZTL del centro storico di Padova con regole specifiche per veicoli elettrici",
    request_url:
      "https://www.padovanet.it/informazione/zona-traffico-limitato-ztl",
    needs_display: true,
    free_parking: false,
    coordinates: [11.8767, 45.4064],
    duration: "5 anni",
    office_address: "Ufficio Permessi ZTL, Via Vicenza 10a, 35138 Padova",
    office_hours:
      "Lunedì-Venerdì 8:30-13:00; Martedì e Giovedì anche 15:00-17:00",
    phone: "+39 049 8204700",
    email: "permessiztl@comune.padova.it",
    parking_zones_description: "Non sono previste agevolazioni",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL con permesso specifico",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, codice fiscale",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Il contrassegno deve essere esposto sul parabrezza in modo visibile",
  },
  {
    id: "siena",
    name: "Siena",
    region: "Toscana",
    description:
      "ZTL del centro storico di Siena con regole specifiche per veicoli elettrici",
    request_url:
      "https://sigericospa.it/nuova-normativa-ztl-a-siena-tutte-le-informazioni/",
    needs_display: true,
    free_parking: true,
    coordinates: [11.3304, 43.3186],
    duration: "3 anni",
    office_address: "Siena Parcheggi, Via S. Agata 1, 53100 Siena",
    office_hours:
      "Lunedì-Venerdì 8:15-12:45; Martedì e Giovedì anche 15:00-17:00",
    phone: "+39 0577 228711",
    email: "si.park@sienaparcheggi.com",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL con contrassegno specifico",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, codice fiscale",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Il contrassegno deve essere esposto sul parabrezza in modo visibile",
  },
  {
    id: "pisa",
    name: "Pisa",
    region: "Toscana",
    description:
      "ZTL del centro storico di Pisa suddivisa in due zone (Nord e Sud) con regole specifiche per veicoli elettrici, accesso regolamentato e tariffe variabili in base alla residenza",
    request_url: "https://mobilita.pisamo.net/permesso-ztl-auto-elettriche/",
    needs_display: true,
    free_parking: false,
    coordinates: [10.4018, 43.7228],
    duration: "Annuale, con scadenza il 31 dicembre dell’anno di riferimento",
    office_address: "Pisamo, Via Cesare Battisti 53, 56125 Pisa",
    office_hours:
      "Lunedì–Venerdì 8:30–12:30; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 050 26111",
    email: "info@pisamo.it",
    parking_zones_description:
      "I parcheggi su strisce blu sono sempre a pagamento. È prevista la gratuità solo nelle strisce bianche, se presenti, all’interno della ZTL",
    ztl_access_description:
      "Accesso consentito con contrassegno. I residenti del centro hanno accesso gratuito alla propria zona (Nord o Sud). Per entrambe le zone è previsto un costo aggiuntivo. I non residenti possono acquistare autorizzazioni annuali",
    cost: "Residenti ZTL: gratuito per una zona, circa €50/anno per entrambe. Non residenti: circa €50/anno per una zona, €100/anno per entrambe",
    payment_method: "Pagamento presso Pisamo o tramite portale, se abilitato",
    required_documents:
      "Carta di circolazione, documento d’identità, codice fiscale, modulo di richiesta",
    requirements: "Veicolo con alimentazione esclusivamente elettrica (BEV)",
    notes:
      "Il permesso deve essere esposto visibilmente. La ZTL è suddivisa in due zone: Nord e Sud. La sosta gratuita non è prevista sulle strisce blu.",
  },
  {
    id: "parma",
    name: "Parma",
    region: "Emilia-Romagna",
    description:
      "ZTL del centro storico di Parma con regole specifiche per veicoli elettrici",
    request_url:
      "https://www.comune.parma.it/it/servizi/mobilita-e-trasporti/auto-amica-ambiente",
    needs_display: true,
    free_parking: true,
    coordinates: [10.3279, 44.8015],
    duration: "5 anni",
    office_address: "Infomobility, Viale Mentana 29/A, 43121 Parma",
    office_hours:
      "Lunedì-Venerdì 8:30-13:00; Martedì e Giovedì anche 14:00-17:00",
    phone: "+39 0521 031111",
    email: "varchi@infomobility.pr.it",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente nelle strisce blu",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL con contrassegno specifico",
    cost: "Il costo è di 10€ annui + 5 € rfid",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, codice fiscale",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Il contrassegno deve essere esposto sul parabrezza in modo visibile",
  },
  {
    id: "lucca",
    name: "Lucca",
    region: "Toscana",
    description:
      "ZTL del centro storico di Lucca con regole specifiche per veicoli elettrici",
    request_url:
      "https://www.comune.lucca.it/progetti/lucca-e-la-mobilita-elettrica/",
    needs_display: true,
    free_parking: true,
    coordinates: [10.503, 43.843],
    duration: "3 anni",
    office_address: "Metro Srl, Via delle Città Gemelle 1, 55100 Lucca",
    office_hours: "Lunedì-Venerdì 8:30-16:30",
    phone: "+39 0583 492255",
    email: "ufficiopermessi@luccaplus.it ",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente nelle strisce blu",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL con contrassegno specifico",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, codice fiscale",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Il contrassegno deve essere esposto sul parabrezza in modo visibile",
  },
  {
    id: "ancona",
    name: "Ancona",
    region: "Marche",
    description: "Comune di Ancona - Agevolazioni per veicoli elettrici",
    request_url: "https://pass.brav.it/Ancona/Frontoffice/",
    needs_display: false,
    free_parking: true,
    coordinates: [13.5189, 43.6166],
    duration: "1 anno, con rinnovo automatico",
    office_address: "Via Mamiani 76, 60125 - Ancona",
    office_hours:
      "Lunedì – Venerdì: 8:00–14:00 | Martedì e Giovedì anche 14:30–16:00",
    phone: "0712814869",
    email: "permessi@anconaparcheggi.it",
    parking_zones_description: "Tutte le zone blu",
    ztl_access_description: "Non previsto",
    cost: "16€ di bolli",
    payment_method: "Online (pagamento tramite carta di credito, PayPal, etc.)",
    required_documents: "Libretto di circolazione del veicolo",
    requirements: "Nessuno",
    notes:
      "Si consiglia di verificare periodicamente eventuali aggiornamenti e modifiche regolamentari sul sito ufficiale del Comune.",
  },
  {
    id: "modena",
    name: "Modena",
    region: "Emilia-Romagna",
    description:
      "Circolazione e sosta dei veicoli elettrici in ZTL e sosta in deroga al pagamento",
    request_url:
      "https://www.comune.modena.it/amministrazione/documenti-e-dati/atti-normativi/ordinanze/ordinanze-a-carattere-generale/circolazione-e-sosta-dei-veicoli-elettrici-in-ztl-e-sosta-in-deroga-al-pagamento",
    needs_display: false,
    free_parking: true,
    coordinates: [10.9200867, 44.6488366],
    duration: "5 anni",
    office_address: "Via Venceslao Santi, 40, 41123 Modena",
    phone: "059203140",
    email: "infoztl@modenaparcheggi.it",
    parking_zones_description: "Tutte le zone blu tranne Sant'Agostino.",
    ztl_access_description: "Previsto 24h",
    required_documents: "Libretto di circolazione del veicolo",
    requirements: "Nessuno",
    notes:
      "Non si può transitare nelle corsie riservate che sono Piazza Roma, Corso Duomo ed il tratto di Via Emilia Centro che va da Via Torre a Vicolo Squallore.",
  },
  {
    id: "barletta",
    name: "Barletta",
    region: "Puglia",
    description:
      " I veicoli elettrici ed ibridi possono transitare per le ZTL. È necessaria un'autorizzazione da presentare al comune. I moduli necessari sono scaricabili dal sito internet del comune",
    request_url:
      "https://www3.comune.barletta.bt.it/retecivica/utt/pass_e.html",
    needs_display: false,
    free_parking: true,
    coordinates: [41.3197, 16.2838],
    duration: "5 anni",
    office_address: "Comando di Polizia Locale in via Zanardelli, 3, Barletta",
    phone: "0883 3001",
    parking_zones_description: "Non sono previste agevolazioni",
    ztl_access_description: "Previsto 24h",
    required_documents: "Libretto di circolazione del veicolo",
    requirements: "Nessuno",
    notes:
      "corso Vittorio Emanuele II all’incrocio con via Municipio; \n" +
      "corso Vittorio Emanuele II all’incrocio con via Nazareth; \n" +
      "corso Garibaldi all’incrocio con via Cavour; \n" +
      "via Cavour all’incrocio con vico Cambio; \n" +
      "via Cavour all’incrocio con via Carlo V d’Asburgo (ingresso Castello); \n" +
      "piazza Marina (direzione Centro Storico, Caserma Provinciale Guardia di Finanza); \n" +
      "piazza Marina (direzione Castello).",
  },
  {
    id: "senigallia",
    name: "Senigallia",
    region: "Marche",
    description:
      "ZTL del centro storico di Senigallia con accesso e sosta gratuita per veicoli esclusivamente elettrici",
    request_url:
      "https://www.comune.senigallia.an.it/servizio/richiesta-permessi-di-circolazione-in-zona-a-traffico-limitato-e-area-pedonale/", 
    needs_display: true,
    free_parking: true,
    coordinates: [13.2149, 43.7184],
    duration: "Fino al 31 dicembre dell'anno di riferimento",
    office_address:
      "Polizia Municipale di Senigallia, Via Cimabue 3, 60019 Senigallia (AN)",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 071 6629288",
    email: "polizia.municipale@comune.senigallia.an.it",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente sulle strisce blu",
    ztl_access_description:
      "I veicoli elettrici a batteria (BEV) possono accedere alla ZTL previa autorizzazione",
    cost: "Marca da bollo da 16€",
    payment_method: "Pagamento marca da bollo da acquistare in tabaccheria",
    required_documents:
      "Carta di circolazione del veicolo, documento d'identità, marca da bollo da 16€",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "La procedura è disponibile anche online sul sito del Comune. Non sono ammessi ibridi o plug-in.",
  },
  {
    id: "foligno",
    name: "Foligno",
    region: "Umbria",
    description:
      "ZTL e sosta su strisce blu gratuite per veicoli esclusivamente elettrici previa richiesta al Comune",
    request_url:
      "https://www.comune.foligno.pg.it/servizio/autorizzazioni-transito-e-sosta-ztl/",
    needs_display: true,
    free_parking: true,
    coordinates: [12.7034, 42.9531],
    duration: "1 anno, rinnovabile",
    office_address:
      "Comando Polizia Municipale, Via Cairoli 24, 06034 Foligno (PG)",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:30–17:30",
    phone: "+39 0742 330665",
    email: "poliziamun@comune.foligno.pg.it",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente nelle strisce blu",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL previa richiesta e autorizzazione",
    cost: "Gratuito il permesso, ma la domanda deve essere accompagnata da marca da bollo da 16€",
    payment_method: "Non necessario per il permesso",
    required_documents:
      "Carta di circolazione del veicolo, documento d'identità, modulo di richiesta",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "Il permesso viene rilasciato dal Comando di Polizia Municipale e deve essere esposto visibilmente.",
  },
  {
    id: "rieti",
    name: "Rieti",
    region: "Lazio",
    description:
      "Accesso alla ZTL per veicoli elettrici e ibridi previa richiesta via email al Comune",
    request_url:
      "https://comune.rieti.it/novita/permessi-accesso-ztl-2025-le-modalita-di-rinnovo-e-nuove-richieste/", 
    needs_display: false,
    free_parking: false,
    coordinates: [12.8608, 42.4048],
    duration: "Da definire in base all’autorizzazione rilasciata",
    office_address:
      "Comando Polizia Locale, Via della Repubblica 3, 02100 Rieti",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 0746 2871",
    email: "permessi@comune.rieti.it",
    parking_zones_description:
      "Non sono previste agevolazioni sulle strisce blu",
    ztl_access_description:
      "Accesso alla ZTL consentito a veicoli elettrici e ibridi previa autorizzazione",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione del veicolo da inviare via email",
    requirements: "Veicolo elettrico o ibrido",
    notes:
      "La richiesta deve essere inviata all’indirizzo email indicato allegando il libretto; il permesso verrà rilasciato in forma digitale o cartacea.",
  },
  {
    id: "asti",
    name: "Asti",
    region: "Piemonte",
    description:
      "Parcheggio gratuito per veicoli elettrici in aree selezionate previa registrazione su app AstiParcheggi",
    request_url:
      "https://www.comune.asti.it/media/1438#:~:text=Nel%20caso%20di%20domiciliati%2C%20l,in%20occasione%20di%20visite%20domiciliari.", // verificare eventuale URL ufficiale
    needs_display: false,
    free_parking: true,
    coordinates: [8.2066, 44.9002],
    duration: "1 anno",
    office_address: "ASP Asti, Corso Don Minzoni 86, 14100 Asti",
    office_hours:
      "Lunedì–Venerdì 8:30–12:30; Martedì e Giovedì anche 14:30–16:30",
    phone: "+39 0141 434611",
    email: "info@asp.asti.it",
    parking_zones_description:
      "Parcheggio gratuito in Piazza Campo del Palio e Corso Einaudi previa registrazione",
    ztl_access_description: "Non specificato; la misura riguarda la sosta",
    cost: "Gratuito",
    payment_method: "Registrazione su app AstiParcheggi",
    required_documents:
      "Numero di targa e immagine del libretto (carta di circolazione)",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "Selezionare l’abbonamento 'Gratuito Campo Palio – veicoli elettrici' nell’app AstiParcheggi. Il sistema consente il controllo automatico da parte degli accertatori ASP.",
  },
  {
    id: "cervia",
    name: "Cervia",
    region: "Emilia-Romagna",
    description:
      "Parcheggio gratuito su strisce blu per veicoli elettrici previa richiesta al Comune",
    request_url:
      "https://sportellotelematico.comune.cervia.ra.it/action%3Ac_c553%3Asosta.auto.elettrica%3Bpermesso",
    needs_display: true,
    free_parking: true,
    coordinates: [12.3501, 44.2595],
    duration: "1 anno, rinnovabile",
    office_address:
      "Comune di Cervia – Ufficio Mobilità, Piazza Garibaldi 1, 48015 Cervia (RA)",
    office_hours:
      "Lunedì–Venerdì 8:30–12:30; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 0544 979111",
    email: "urp@comunecervia.it",
    parking_zones_description:
      "Parcheggio gratuito consentito nelle strisce blu con esclusione delle zone a tariffa rossa e viola,",
    ztl_access_description: "Non si può accedere alla ZTL",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione del veicolo, documento d’identità, modulo di richiesta",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "È necessario richiedere l’autorizzazione preventiva al Comune per usufruire dell’agevolazione.",
  },
  {
    id: "ferrara",
    name: "Ferrara",
    region: "Emilia-Romagna",
    description:
      "Parcheggio gratuito per veicoli elettrici su strisce blu previa richiesta del pass 'Mi muovo elettrico'",
    request_url: "https://www.comune.ferrara.it/b/11833/mi-muovo-elettrico",
    needs_display: true,
    free_parking: true,
    coordinates: [11.619, 44.835],
    duration: "3 anni",
    office_address:
      "Ferrara TUA – Servizio Mobilità, Via Bologna 9, 44122 Ferrara",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 14:30–17:00",
    phone: "+39 0532 230311",
    email: "info@ferraratua.it",
    parking_zones_description:
      "I veicoli elettrici possono sostare gratuitamente nei parcheggi a pagamento su strisce blu con pass 'Mi muovo elettrico'",
    ztl_access_description:
      "Non è consentito l’accesso alla ZTL anche con veicoli elettrici",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, modulo richiesta pass",
    requirements: "Veicolo con alimentazione esclusivamente elettrica (BEV)",
    notes:
      "Il pass deve essere esposto in modo visibile sul veicolo. Non sono previste deroghe per l'accesso in ZTL.",
  },
  {
    id: "mestre",
    name: "Mestre",
    region: "Veneto",
    description:
      "Parcheggio gratuito su strisce blu per veicoli elettrici nella città di Mestre",
    request_url:
      "https://avm.avmspa.it/it/content/le-zone-traffico-limitato-del-centro-di-mestre-0",
    needs_display: true,
    free_parking: true,
    coordinates: [12.2431, 45.4917],
    duration: "1 anno, rinnovabile",
    office_address:
      "AVM S.p.A., Isola Nova del Tronchetto 33, 30135 Venezia (VE)",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 14:30–16:30",
    phone: "+39 041 2722111",
    email: "avm@avmspa.it",
    parking_zones_description:
      "Parcheggio gratuito nelle aree gestite da AVM con strisce blu, previa registrazione targa",
    ztl_access_description:
      "Non specificato per Mestre; la misura riguarda la sola sosta",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, modulo di richiesta, targa da registrare sul portale AVM",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Il servizio è valido solo per le EV e non per ibride o plug-in. Registrazione necessaria tramite modulo online o sportello AVM.",
  },
  {
    id: "brescia",
    name: "Brescia",
    region: "Lombardia",
    description:
      "Contrassegno E per veicoli elettrici con accesso ZTL (escluse le aree pedonali) e sosta gratuita su strisce blu e gialle",
    request_url:
      "https://www.comune.brescia.it/aree-tematiche/mobilita-e-trasporti/permessi-ztl/contrassegno-di-tipo-e-auto-elettrica",
    needs_display: true,
    free_parking: true,
    coordinates: [10.2118, 45.5416],
    duration: "Illimitata (finché sussistono i requisiti)",
    office_address:
      "Comune di Brescia – Settore Mobilità, Via Marconi 12, 25126 Brescia",
    office_hours:
      "Lunedì–Venerdì 8:30–12:30; Martedì e Giovedì anche 14:00–16:00",
    phone: "+39 030 2978611",
    email: "permessi@comune.brescia.it",
    parking_zones_description:
      "Sosta gratuita sia sulle strisce blu (a pagamento) sia sulle strisce gialle riservate ai residenti e autorizzati",
    ztl_access_description:
      "Accesso consentito alla ZTL con contrassegno E, esclusi Corso Zanardelli, Piazza Loggia, Piazza Paolo VI e altre aree pedonali privilegiate",
    cost: "Necessarie due marche da bollo da 16€",
    payment_method: "Marca da bollo cartacea da allegare alla richiesta sosta",
    required_documents:
      "Carta di circolazione, modulo richiesta, documento d’identità",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "Il contrassegno è digitale e valido finché sussistono le condizioni per il rilascio. Le zone pedonali e a pedonalità privilegiata restano interdette.",
  },
  {
    id: "pescara",
    name: "Pescara",
    region: "Abruzzo",
    description:
      "Parcheggio gratuito su tutti gli stalli blu per veicoli elettrici 100%, previa registrazione via email",
    request_url:
      "https://mobilita.comune.pescara.it/le-auto-elettriche-potranno-circolare-liberamente-nelle-zone-a-traffico-limitato/#:~:text=Le%20auto%20elettriche%20potranno%20circolare%20liberamente%20nelle%20zone%20a%20traffico%20limitato,-Comunicato%20Stampa&text=Le%20auto%20elettriche%20potranno%20circolare%20liberamente%20in%20Ztl%2C%20senza%20vincoli,auto%20ad%20esclusiva%20propulsione%20elettrica", 
    needs_display: true,
    free_parking: true,
    coordinates: [14.2028, 42.4643],
    duration: "Annuale (rinnovabile)",
    office_address:
      "Pescara Multiservice S.p.A., Via Cesare Battisti 122, 65122 Pescara",
    office_hours:
      "Lunedì–Venerdì 9:00–12:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 085 2058944",
    email: "info@pescaramultiservice.it",
    parking_zones_description:
      "Parcheggio gratuito su tutti gli stalli blu in città previa registrazione della targa",
    ztl_access_description:
      "Non specificato; agevolazione riferita esclusivamente alla sosta",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione del veicolo da inviare via email",
    requirements: "Veicolo 100% elettrico (BEV)",
    notes:
      "Per usufruire dell’esenzione è necessario inviare una mail con copia del libretto a Pescara Multiservice; l’autorizzazione viene registrata nei sistemi di controllo.",
  },
  {
    id: "perugia",
    name: "Perugia",
    region: "Umbria",
    description:
      "Accesso ZTL e sosta gratuita su strisce blu per veicoli elettrici a Perugia",
    request_url:
      "https://www.comune.perugia.it/pagine/mobilita-elettrica-viabilita-e-mobilita#:~:text=Il%20Comune%20di%20Perugia%20SI,e%20scarico%20negli%20appositi%20spazi.",
    needs_display: true,
    free_parking: true,
    coordinates: [12.3888, 43.1122],
    duration: "Fino al 31 dicembre 2025",
    office_address: "Comune di Perugia, Corso Vannucci 19, 06121 Perugia",
    office_hours: "Lunedì-Venerdì 8:30-12:30; Mercoledì anche 15:00-17:00",
    phone: "+39 075 5775378",
    email: "permessiztl@comune.perugia.it",
    parking_zones_description:
      "I veicoli elettrici possono parcheggiare gratuitamente negli stalli a pagamento, previa esposizione del permesso annuale",
    ztl_access_description:
      "I veicoli elettrici possono accedere alle ZTL con permesso annuale gratuito, valido fino al 31 dicembre 2025",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d'identità, codice fiscale",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "Il permesso deve essere esposto in modo visibile sul parabrezza del veicolo",
  },
  {
    id: "pistoia",
    name: "Pistoia",
    region: "Toscana",
    description:
      "Tutti i veicoli elettrici devono richiedere permesso temporaneo per accedere alla ZTL",
    request_url:
      "https://sportellotelematico.comune.pistoia.it/action%3Ac_g713%3Azona.traffico.limitato%3Bpermesso.temporaneo",
    needs_display: true,
    free_parking: false,
    coordinates: [10.9177, 43.9305],
    duration: "Temporaneo, da verificare nel modulo online",
    office_address:
      "Comune di Pistoia – Ufficio Mobilità, Piazza del Duomo 1, 51100 Pistoia",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 0573 3711",
    email: "mobilita@comune.pistoia.it",
    parking_zones_description:
      "Non sono previste agevolazioni per la sosta su strisce blu",
    ztl_access_description:
      "Non è consentito l’accesso alla ZTL senza rilascio di un permesso temporaneo",
    cost: "Da verificare sul portale in base alla richiesta",
    payment_method: "Online tramite sportello telematico",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo telematico",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "La richiesta va presentata tramite lo sportello telematico comunale. Non sono previste agevolazioni sulla sosta.",
  },
  {
    id: "piacenza",
    name: "Piacenza",
    region: "Emilia-Romagna",
    description:
      "Accesso ZTL e parcheggio gratuito su strisce blu per veicoli elettrici con pass 'Mi Muovo Elettrico'",
    request_url:
      "https://spazio2.piacenza.it/servizi/mobilita-e-trasporti/ztl-pass-mi-muovo-elettrico",
    needs_display: true,
    free_parking: true,
    coordinates: [9.6949, 45.0522],
    duration: "5 anni",
    office_address:
      "Comune di Piacenza – Ufficio Permessi Mobilità, Via Beverora 57, 29121 Piacenza",
    office_hours: "Lunedì–Venerdì 8:30–13:00; Giovedì anche 15:00–17:00",
    phone: "+39 0523 492111",
    email: "ztl@comune.piacenza.it",
    parking_zones_description:
      "Parcheggio gratuito su strisce blu previa esposizione del pass 'Mi Muovo Elettrico'",
    ztl_access_description:
      "Accesso consentito alla ZTL settore A 24 ore su 24 con pass 'Mi Muovo Elettrico'",
    cost: "Gratuito",
    payment_method:
      "Richiesta online tramite portale BRAV o presso lo sportello comunale",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo di richiesta",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "Il pass ha durata quinquennale e consente sia l'accesso ZTL (settore A) che la sosta gratuita. È necessario esporre il pass e registrarsi tramite il portale BRAV.",
  },
  {
    id: "nocera-inferiore",
    name: "Nocera Inferiore",
    region: "Campania",
    description:
      "Accesso ZTL consentito ai veicoli elettrici previa autorizzazione",
    request_url:
      "https://www.comune.nocera-inferiore.sa.it/it/struttura/settore-polizia-locale",
    needs_display: true,
    free_parking: false,
    coordinates: [14.639, 40.749],
    duration: "Da definire",
    office_address: "Comando Polizia Municipale, Via Libroia, Nocera Inferiore",
    office_hours:
      "Lunedì, Mercoledì e Venerdì 9:00-12:00; Martedì e Giovedì 16:00-17:30",
    phone: "+39 081 3235300",
    email: "ztl@comune.nocera-inferiore.sa.it",
    parking_zones_description: "Non è prevista la gratuità per le strisce blu",
    ztl_access_description:
      "I veicoli elettrici possono accedere alla ZTL previa autorizzazione",
    cost: "Gratuito per veicoli elettrici",
    payment_method: "Non necessario",
    required_documents: "Carta di circolazione, documento d'identità",
    requirements: "Veicolo con alimentazione esclusivamente elettrica",
    notes:
      "L'accesso alla ZTL è consentito ai veicoli elettrici previa autorizzazione. Per ulteriori informazioni, contattare la Polizia Municipale.",
  },
  {
    id: "livorno",
    name: "Livorno",
    region: "Toscana",
    description:
      "Accesso consentito alla ZTL e sosta gratuita nelle ZSC (Zone di Sosta Controllata) per veicoli elettrici",
    request_url: "https://permessiztlzsc.comune.livorno.it/index.php",
    needs_display: true,
    free_parking: true,
    coordinates: [10.3113, 43.5485],
    duration: "1 anno, rinnovabile",
    office_address:
      "Sportello Permessi ZTL/ZSC, Comune di Livorno, Piazza del Municipio 1, 57123 Livorno",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 0586 820111",
    email: "permessi.livorno@esteemsrl.it",
    parking_zones_description:
      "Sosta gratuita nelle ZSC per veicoli elettrici con permesso attivo",
    ztl_access_description:
      "Accesso consentito alla ZTL previa registrazione e rilascio del permesso",
    cost: "Gratuito",
    payment_method: "Online tramite portale del Comune",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo online",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "Il permesso deve essere richiesto tramite il portale ufficiale del Comune. Vale sia per accesso ZTL sia per sosta ZSC.",
  },
  {
    id: "cremona",
    name: "Cremona",
    region: "Lombardia",
    description:
      "Accesso consentito ai veicoli elettrici esclusivamente in due varchi ZTL; nessuna agevolazione per il parcheggio",
    request_url: "https://aemcremona.it/servizi/permessi-ztl/",
    needs_display: true,
    free_parking: false,
    coordinates: [10.0213, 45.1333],
    duration: "Annuale (verificare condizioni sul sito AEM)",
    office_address:
      "AEM Cremona S.p.A. – Ufficio Permessi ZTL, Via Postumia 23, 26100 Cremona",
    office_hours:
      "Lunedì–Venerdì 8:30–12:30; Martedì e Giovedì anche 14:30–16:30",
    phone: "+39 0372 433511",
    email: "ufficio.permessi@aemcremona.it",
    parking_zones_description:
      "Non sono previste agevolazioni per la sosta su strisce blu o riservate",
    ztl_access_description:
      "I veicoli elettrici possono accedere solo da due varchi ZTL dedicati, previa autorizzazione",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo richiesta AEM",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "È necessario richiedere il permesso presso AEM per accedere unicamente ai varchi abilitati. Il permesso non consente la sosta gratuita.",
  },
  {
    id: "taranto",
    name: "Taranto",
    region: "Puglia",
    description:
      "Parcheggio gratuito per veicoli elettrici su strisce blu, previa registrazione sul sito di Kyma Mobilità",
    request_url:
      "https://www.kymamobilita.it/nuova-disciplina-della-sosta-tariffata-permesso-gratuito-per-autoveicoli-elettrici/",
    needs_display: true,
    free_parking: true,
    coordinates: [17.247, 40.4644],
    duration: "1 anno, rinnovabile",
    office_address:
      "Kyma Mobilità S.p.A., Viale Magna Grecia 418, 74121 Taranto",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 099 7786811",
    email: "kymamobilita@kymamobilita.it",
    parking_zones_description:
      "Sosta gratuita per auto elettriche su tutti gli stalli blu regolamentati da Kyma Mobilità",
    ztl_access_description:
      "Non sono previste agevolazioni per l’accesso alla ZTL",
    cost: "Gratuito",
    payment_method: "Registrazione gratuita sul portale Kyma Mobilità",
    required_documents: "Carta di circolazione, targa, modulo online",
    requirements: "Veicolo 100% elettrico (BEV)",
    notes:
      "È necessario completare la registrazione sul portale Kyma Mobilità per ottenere il permesso digitale.",
  },
  {
    id: "cagliari",
    name: "Cagliari",
    region: "Sardegna",
    description:
      "Accesso alle ZTL nei quartieri storici e sosta gratuita nei parcheggi di superficie per veicoli elettrici previa richiesta di pass digitale tramite SPID",
    request_url:
      "https://www.comune.cagliari.it/portale/page/it/pass_ztl_per_veicoli_a_trazione_elettrica?contentId=SRV10367",
    needs_display: true,
    free_parking: true,
    coordinates: [9.1217, 39.2238],
    duration: "1 anno (rinnovabile)",
    office_address:
      "Comune di Cagliari – Servizio Mobilità, Via Sonnino 111, 09127 Cagliari",
    office_hours:
      "Lunedì–Venerdì 9:00–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 070 6771",
    email: "ufficioztl@comune.cagliari.it",
    parking_zones_description:
      "Sosta gratuita consentita nei parcheggi a pagamento di superficie gestiti da Parkar e Apcoa, **esclusa** l'area portuale (di competenza demaniale)",
    ztl_access_description:
      "Accesso consentito nelle ZTL dei quartieri Marina, Castello, Villanova e Stampace, previa richiesta del pass tramite SPID",
    cost: "Gratuito",
    payment_method: "Richiesta online tramite SPID",
    required_documents:
      "Carta di circolazione, documento d’identità, codice fiscale (da caricare digitalmente durante la richiesta)",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "Il pass ha validità annuale e deve essere richiesto tramite SPID. Il contrassegno è digitale e include accesso ZTL e sosta gratuita (con limitazioni).",
  },
  {
    id: "la-spezia",
    name: "La Spezia",
    region: "Liguria",
    description:
      "Accesso alla ZTL e parcheggio gratuito su strisce blu per veicoli elettrici, previa richiesta tramite MobPark",
    request_url:
      "https://mobpark.eu/rilascio-autorizzazioni/documenti-e-metodi-di-pagamento-auto-elettriche/",
    needs_display: true,
    free_parking: true,
    coordinates: [9.8241, 44.1072],
    duration: "1 anno",
    office_address: "MobPark S.r.l., Via Fontevivo 21, 19125 La Spezia",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 0187 518225",
    email: "infomobpark@mobpark.it",
    parking_zones_description:
      "Parcheggio gratuito su tutte le strisce blu per veicoli elettrici previa autorizzazione rilasciata da MobPark",
    ztl_access_description:
      "Accesso alla ZTL consentito ai veicoli elettrici previa registrazione della targa presso MobPark",
    cost: "Gratuito",
    payment_method: "Richiesta online tramite portale MobPark",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo compilato",
    requirements: "Veicolo 100% elettrico (BEV)",
    notes:
      "È necessario presentare domanda tramite il portale MobPark. La registrazione è valida per accedere alla ZTL e sostare gratuitamente su strisce blu.",
  },
  {
    id: "forli",
    name: "Forlì",
    region: "Emilia-Romagna",
    description:
      "Accesso alla ZTL e sosta gratuita su strisce blu per veicoli elettrici, previa autorizzazione presso l’Ufficio Mobilità Integrata",
    request_url: "http://mercurio.comune.forli.fc.it/comunicazione-targhe/",
    needs_display: true,
    free_parking: true,
    coordinates: [12.0407, 44.2227],
    duration: "Illimitata",
    office_address: "Ufficio Mobilità Integrata, Piazza Saffi 8, 47121 Forlì",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 0543 712111",
    email: "mobilita.integrata@comune.forli.fc.it",
    parking_zones_description:
      "Parcheggio gratuito su tutte le strisce blu del centro previa autorizzazione",
    ztl_access_description:
      "Accesso consentito in tutte le ZTL per veicoli elettrici previa registrazione",
    cost: "5€ una tantum",
    payment_method: "Pagamento presso Ufficio Mobilità Integrata",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo richiesta",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "L’autorizzazione ha validità permanente. È necessario recarsi all’Ufficio Mobilità Integrata per il rilascio del permesso e pagare un contributo una tantum di 5€.",
  },
  {
    id: "nicosia",
    name: "Nicosia",
    region: "Sicilia",
    description:
      "Sosta gratuita nelle zone blu per veicoli elettrici e plug-in previa richiesta di pass alla Polizia Municipale",
    request_url:
      "https://www.telenicosia.it/a-nicosia-parcheggi-gratuiti-per-veicoli-elettrici-e-ibridi/", // sito principale, nessuna pagina dedicata specifica trovata
    needs_display: true,
    free_parking: true,
    coordinates: [14.3951, 37.7502],
    office_address:
      "Comando della Polizia Municipale di Nicosia (EN)  Via di Falco Bernardo, 49.",
    office_hours:
      "Lunedì–Venerdì dalle 9:00 alle 13:00, Sabato e domenica chiuso. ",
    phone: "+39 0935 638880",
    email: "poliziamunicipale@comune.nicosia.en.it",
    parking_zones_description:
      "Sosta gratuita per veicoli BEV e Plug-in sulle strisce blu con pass rilasciato dal Comune",
    ztl_access_description: "Non specificato o non applicabile",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo richiesta pass",
    requirements: "Veicolo elettrico al 100% (BEV) o Plug-in",
    notes:
      "Il pass va richiesto presso la Polizia Municipale e consente la sosta gratuita nelle aree regolamentate a pagamento. Nessun costo previsto.",
  },
  {
    id: "monza",
    name: "Monza",
    region: "Lombardia",
    description:
      "Parcheggio gratuito per veicoli elettrici sulle strisce blu a Monza previa richiesta online",
    request_url:
      "https://monzamobilita.it/richiedi-pass-sosta-veicoli-elettrici/",
    needs_display: true,
    free_parking: true,
    coordinates: [9.2725, 45.5845],
    duration: "1 anno, rinnovabile",
    office_address:
      "Comune di Monza – Ufficio Mobilità, Piazza Trento e Trieste 1, 20900 Monza",
    office_hours:
      "Lunedì–Venerdì 8:30–12:30; Martedì e Giovedì anche 14:30–16:30",
    phone: "+39 039 23721",
    email: "mobilita@comune.monza.it",
    parking_zones_description:
      "I veicoli elettrici possono sostare gratuitamente su tutte le strisce blu previa registrazione online",
    ztl_access_description: "Non specificato o non previsto",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d’identità, targa da associare tramite portale",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "La procedura per la richiesta dell'autorizzazione alla sosta gratuita avviene interamente online tramite il portale del Comune di Monza.",
  },
  {
    id: "caserta",
    name: "Caserta",
    region: "Campania",
    description:
      "Parcheggio gratuito per le prime due ore e accesso alla ZTL per veicoli elettrici, previa registrazione",
    request_url:
      "https://trasparenza.comune.caserta.it/archivio5_modulistica_0_18490.html", 
    needs_display: true,
    free_parking: true,
    coordinates: [14.3335, 41.0739],
    duration: "1 anno (rinnovabile)",
    office_address:
      "Comune di Caserta – Ufficio Mobilità, Piazza Vanvitelli 1, 81100 Caserta",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 0823 273111",
    email: "ztl@comune.caserta.it",
    parking_zones_description:
      "Parcheggio gratuito per le prime 2 ore su stalli blu riservato a veicoli elettrici previa autorizzazione",
    ztl_access_description:
      "Accesso ZTL consentito per veicoli elettrici previa richiesta e registrazione della targa",
    cost: "Gratuito",
    payment_method: "Registrazione tramite portale comunale o sportello",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo richiesta",
    requirements: "Veicolo 100% elettrico (BEV)",
    notes:
      "La gratuità del parcheggio è valida solo per le prime due ore giornaliere. L’autorizzazione deve essere richiesta al Comune per usufruire delle agevolazioni.",
  },
  {
    id: "ravenna",
    name: "Ravenna",
    region: "Emilia-Romagna",
    description:
      "Accesso alla ZTL e sosta gratuita per veicoli elettrici previa richiesta del contrassegno VE",
    request_url:
      "https://www.comune.ra.it/proceedings/contrassegno-tipo-ve-contrassegno-di-circolazione-e-sosta-veicoli-a-trazione-puramente-elettrica/",
    needs_display: true,
    free_parking: true,
    coordinates: [12.2035, 44.4184],
    duration: "1 anno (rinnovabile)",
    office_address:
      "Comune di Ravenna – Ufficio Mobilità, Via Berlinguer 58, 48124 Ravenna",
    office_hours:
      "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 14:30–16:30",
    phone: "+39 0544 482111",
    email: "permessi@comune.ravenna.it",
    parking_zones_description:
      "Sosta gratuita consentita su strisce blu previa esposizione del contrassegno VE",
    ztl_access_description:
      "Accesso alla ZTL con veicolo elettrico consentito solo previa autorizzazione",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo online",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "È necessario ottenere il contrassegno di tipo VE per poter circolare e sostare gratuitamente. Il contrassegno deve essere esposto sul parabrezza.",
  },
  {
    id: "udine",
    name: "Udine",
    region: "Friuli Venezia Giulia",
    description:
      "Parcheggio gratuito nei parcheggi a raso su strisce blu per veicoli elettrici previa esposizione di fotocopia del libretto",
    request_url:
      "https://www.comune.udine.it/Amministrazione/Documenti-e-dati/Ordinanza-Sosta-gratuita-per-veicoli-ecologici",
    needs_display: true,
    free_parking: true,
    coordinates: [13.2363, 46.0633],
    duration: "Illimitata (fino a variazione della normativa)",
    office_address:
      "SSM Udine – Società di Servizi alla Mobilità, Viale Venezia 6, 33100 Udine",
    office_hours: "Lunedì–Venerdì 9:00–12:30",
    phone: "+39 0432 504411",
    email: "info@ssm.it",
    parking_zones_description:
      "Sosta gratuita nei parcheggi a raso su strisce blu previa esposizione di fotocopia del libretto con alimentazione e targa visibili",
    ztl_access_description: "Non previsto",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Fotocopia del libretto con evidenza di targa e alimentazione elettrica",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "Non è necessario richiedere un permesso. È sufficiente esporre una fotocopia del libretto in modo ben visibile sul cruscotto.",
  },
  {
    id: "riposto",
    name: "Riposto",
    region: "Sicilia",
    description:
      "Parcheggio gratuito su strisce blu per veicoli elettrici. Nessun pass necessario ma consigliata esposizione di dicitura 'VEICOLO ELETTRICO'",
    request_url:
      "https://comune.riposto.ct.it/it/page/regolamento-per-la-disciplina-dei-permessi-nelle-zone-a-traffico-limitato-ztl-e-aree-limitrofe",
    needs_display: true,
    free_parking: true,
    coordinates: [15.2165, 37.7275],
    duration: "Illimitata (fino a nuova disposizione comunale)",
    office_address:
      "Comune di Riposto – Comando Polizia Municipale, Piazza San Pietro 1, 95018 Riposto (CT)",
    office_hours: "Lunedì–Venerdì 8:30–13:00",
    phone: "+39 095 963011",
    email: "protocollo@pec.comune.riposto.ct.it",
    parking_zones_description:
      "Sosta gratuita su strisce blu per BEV e PHEV. Non è richiesto alcun pass formale",
    ztl_access_description: "Non specificato o non previsto",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Nessuna documentazione obbligatoria; consigliata esposizione volontaria della dicitura 'VEICOLO ELETTRICO'",
    requirements: "Veicolo a trazione elettrica o plug-in",
    notes:
      "Il Comune consiglia l’esposizione di una scritta ben visibile sul cruscotto con dicitura 'VEICOLO ELETTRICO', anche realizzata autonomamente.",
  },
  {
    id: "san-daniele-del-friuli",
    name: "San Daniele del Friuli",
    region: "Friuli Venezia Giulia",
    description:
      "Parcheggio gratuito sulle strisce blu per veicoli elettrici previa esposizione del libretto di circolazione",
    request_url: "https://www.comune.sandanieledelfriuli.ud.it/it/servizi-49762/permessi-al-transito-e-sosta-91606", 
    needs_display: true,
    free_parking: true,
    coordinates: [13.0107, 46.1584],
    duration: "Illimitata (salvo modifiche regolamento)",
    office_address:
      "Comune di San Daniele del Friuli – Via del Colle 10, 33038 San Daniele (UD)",
    office_hours: "Lunedì–Venerdì 9:00–12:00",
    phone: "+39 0432 939511",
    email: "info@comune.sandaniele.ud.it",
    parking_zones_description:
      "Sosta gratuita su strisce blu previa esposizione del libretto di circolazione sul cruscotto",
    ztl_access_description:
      "Non specificato",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Libretto di circolazione visibile all’interno del veicolo",
    requirements: "Veicolo 100% elettrico (BEV)",
    notes:
      "Nessuna richiesta formale necessaria. È sufficiente esporre il libretto in modo leggibile per i controlli.",
  },
  {
    id: "lignano-sabbiadoro",
    name: "Lignano Sabbiadoro",
    region: "Friuli Venezia Giulia",
    description:
      "Parcheggio gratuito sulle strisce blu per veicoli elettrici nei mesi a pagamento, previa esposizione del libretto",
    request_url: "https://comune.lignano-sabbiadoro.ud.it/servizi/mobilita-e-trasporti/autorizzazione-per-il-transito-su-zona-a-traffico-limitato-ztl", 
    needs_display: true,
    free_parking: true,
    coordinates: [13.1463, 45.6825],
    duration: "Stagionale: dal 1 maggio al 30 settembre",
    office_address:
      "Comune di Lignano Sabbiadoro – Viale Europa 26, 33054 Lignano Sabbiadoro (UD)",
    office_hours: "Lunedì–Venerdì 9:00–12:00",
    phone: "+39 0431 409111",
    email: "urp@lignanosabbiadoro.it",
    parking_zones_description:
      "Parcheggio gratuito sulle strisce blu previa esposizione del libretto; non si paga nei mesi invernali",
    ztl_access_description:
      "Non previsto",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Libretto di circolazione esposto in modo ben visibile",
    requirements: "Veicolo elettrico (BEV)",
    notes:
      "La sosta è gratuita tutto l’anno, ma nei mesi da maggio a settembre è necessario esporre il libretto per beneficiare dell’agevolazione.",
  },
  {
    id: "trevi",
    name: "Trevi",
    region: "Umbria",
    description:
      "Sosta gratuita sulle strisce blu per veicoli elettrici, nessuna richiesta necessaria",
    request_url: "https://www.comune.trevi.pg.it/notizie/parcheggi-gratuiti-per-le-auto-elettriche",
    needs_display: false,
    free_parking: true,
    coordinates: [12.7435, 42.8842],
    duration: "Illimitata",
    office_address:
      "Comune di Trevi – Piazza Mazzini 1, 06039 Trevi (PG)",
    office_hours: "Lunedì–Venerdì 8:30–13:00",
    phone: "+39 0742 332222",
    email: "info@comune.trevi.pg.it",
    parking_zones_description:
      "Sosta gratuita sulle strisce blu per veicoli elettrici senza alcuna formalità",
    ztl_access_description:
      "Non previsto",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Nessuno",
    requirements: "Veicolo 100% elettrico",
    notes:
      "Non è necessario esporre né registrarsi: la gratuità è automatica per i veicoli BEV.",
  },
  {
    id: "imperia",
    name: "Imperia",
    region: "Liguria",
    description:
      "Parcheggio gratuito su strisce blu per veicoli elettrici e ibridi plug-in con emissioni ≤ 50 g/km CO2, previa esposizione di apposito contrassegno verde",
    request_url: "https://sportellotelematico.comune.imperia.it/action%3Ac_e290%3Aveicoli.elettrici",
    needs_display: true,
    free_parking: true,
    coordinates: [8.0269, 43.8888],
    duration: "Variabile secondo segnaletica di zona",
    office_address:
      "Comune di Imperia – Ufficio Mobilità, Piazza Dante 4, 18100 Imperia",
    office_hours: "Lunedì–Venerdì 9:00–13:00",
    phone: "+39 0183 7011",
    email: "info@comune.imperia.it",
    parking_zones_description:
      "Sosta gratuita nelle aree a pagamento previa esposizione di contrassegno verde identificativo e disco orario",
    ztl_access_description:
      "Non previsto",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Contrassegno esposto; disco orario; carta di circolazione su richiesta",
    requirements: "BEV o PHEV con emissioni ≤ 50g/km CO2",
    notes:
      "La sosta gratuita è limitata alla durata massima consentita dalla segnaletica; occorre esporre il contrassegno verde e il disco orario.",
  },{
    id: "bergamo",
    name: "Bergamo",
    region: "Lombardia",
    description:
      "Parcheggio gratuito su strisce blu (fino a scadenza del pass già rilasciato) e accesso alla ZTL gratuito per veicoli elettrici previa registrazione",
    request_url:
      "https://www.comune.bergamo.it/procedure%3Ac_a794%3Acomunicazione.targa.propulsione.elettrica",
    needs_display: true,
    free_parking: true,
    coordinates: [9.6689, 45.6983],
    duration: "ZTL: 5 anni — Sosta: fino a scadenza pass annuale",
    office_address:
      "Comune di Bergamo – Ufficio Permessi Mobilità, Via San Giorgio 3, 24122 Bergamo",
    office_hours: "Lunedì–Venerdì 8:30–12:30; Martedì e Giovedì anche 14:00–16:00",
    phone: "+39 035 399111",
    email: "permessi@comune.bergamo.it",
    parking_zones_description:
      "Parcheggio gratuito su strisce blu per BEV solo per chi ha già ottenuto il pass; la gratuità dura fino alla scadenza del permesso (1 anno dalla data di rilascio)",
    ztl_access_description:
      "Accesso ZTL consentito gratuitamente ai veicoli elettrici previa registrazione, con validità quinquennale",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo richiesta",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "Per la ZTL, l'autorizzazione va richiesta con validità 5 anni. La gratuità della sosta blu è valida solo per i permessi già attivi e non rinnovabili automaticamente.",
  },
  {
    id: "galatina",
    name: "Galatina",
    region: "Puglia",
    description:
      "Parcheggio gratuito sulle strisce blu per veicoli elettrici nel Comune di Galatina",
    request_url: "https://www.galatina.it/sites/default/files/2022-03/allegarodel4901.pdf", // sito istituzionale, nessuna pagina dedicata specifica trovata
    needs_display: true,
    free_parking: true,
    coordinates: [18.1713, 40.1743],
    duration: "1 anno (rinnovabile)",
    office_address:
      "Comune di Galatina – Polizia Municipale, Via Vittorio Emanuele II, 73013 Galatina (LE)",
    office_hours: "Lunedì–Venerdì 8:30–12:30",
    phone: "+39 0836 633111",
    email: "comandopm@comune.galatina.le.it",
    parking_zones_description:
      "Sosta gratuita per veicoli elettrici sulle strisce blu previa eventuale registrazione o identificazione del veicolo",
    ztl_access_description:
      "Non specificato o non previsto",
    cost: "Gratuito",
    payment_method: "Non necessario",
    required_documents:
      "Carta di circolazione, documento d’identità (se richiesto)",
    requirements: "Veicolo esclusivamente elettrico (BEV)",
    notes:
      "Si consiglia di contattare la Polizia Municipale per eventuale registrazione della targa o chiarimenti sui limiti temporali della sosta.",
  },{
    id: "spoleto",
    name: "Spoleto",
    region: "Umbria",
    description:
      "Accesso alla ZTL consentito solo per residenti del centro storico o per attività lavorative, previa richiesta cartacea; nessuna agevolazione prevista per la sosta su strisce blu",
    request_url: "https://www.comune.spoleto.pg.it/wp-content/uploads/2022/02/2021_ModART24_PermessoZTL-VeicoloElettrico.pdf", 
    needs_display: true,
    free_parking: false,
    coordinates: [12.7438, 42.7352],
    duration: "1 anno (con rinnovo annuale)",
    office_address:
      "Comune di Spoleto – Ufficio Permessi Mobilità, Via Cerquiglia 3, 06049 Spoleto (PG)",
    office_hours: "Lunedì–Venerdì 8:30–13:00; Martedì e Giovedì anche 15:00–17:00",
    phone: "+39 0743 2181",
    email: "ztl@comune.spoleto.pg.it",
    parking_zones_description:
      "Non sono previste esenzioni o agevolazioni per la sosta su strisce blu, neppure per veicoli elettrici",
    ztl_access_description:
      "L’accesso alla ZTL è consentito esclusivamente ai residenti del centro storico o a chi ha attività lavorative all'interno, previa richiesta cartacea e pagamento",
    cost: "42€ per il primo rilascio, 10€/anno per i rinnovi",
    payment_method: "Pagamento presso sportello o tramite bonifico secondo istruzioni comunali",
    required_documents:
      "Carta di circolazione, documento d’identità, modulo cartaceo compilato e motivazione (residenza o attività)",
    requirements: "Residenza o attività lavorativa nel centro storico",
    notes:
      "Non sono previste agevolazioni per i veicoli elettrici se non rientranti nei criteri sopra indicati. Il pass va richiesto a mano presso l’ufficio mobilità.",
  }
];
