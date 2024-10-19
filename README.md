# For BIS providers
## Namen aplikacije
Namen aplikacije je prikazati delujoč primer pošiljanja naročilnice v e-labex.

## Kje najdem primere?
### Podpisovanje zahtevkov
Metode za podpisovanje zahtevkov so implementirane v [/app/api/helpers.js](https://github.com/premisa-si/e-labex-bis-simulator/blob/main/src/app/api/helpers.js#L4).

### Pošiljanje naročilnice
Metode za pošiljanje so implementirane v [/app/api/simulator/send-referral/route.js](https://github.com/premisa-si/e-labex-bis-simulator/blob/main/src/app/api/simulator/send-referral/route.js#L5).

### Pridobitev slike
Metode ze pridobitev slike naročilnice po ID so implementirane v [/app/api/simulator/image-referral/route.js](https://github.com/premisa-si/e-labex-bis-simulator/blob/main/src/app/api/simulator/image-referral/route.js#L5).

### Pridobitev statusa
Metode ze pridobitev statusa naročilnice po ID ali po BIS številki naročilnice so implementirane v [/app/api/simulator/status-referral/route.js](https://github.com/premisa-si/e-labex-bis-simulator/blob/main/src/app/api/simulator/status-referral/route.js#L5).

### Nalepke
Metode za pridobitev podatkov o nalepkah so implementirane v [/app/api/simulator/labels-referral-details/route.js](https://github.com/premisa-si/e-labex-bis-simulator/blob/main/src/app/api/simulator/labels-referral-details/route.js#L5).

### Pridobitev seznama statusov
Metode ze pridobitev seznama statusov za naročilnice so implementirane v [/app/api/simulator/status-list-referral/route.js](https://github.com/premisa-si/e-labex-bis-simulator/blob/main/src/app/api/simulator/status-list-referral/route.js#L5).

### Pridobitev izvida
Metode ze pridobitev izvidov naročilnice po ID so implementirane v [/app/api/simulator/medical-reports-referral/route.js](https://github.com/premisa-si/e-labex-bis-simulator/blob/main/src/app/api/simulator/medical-reports-referral/route.js#L5).
