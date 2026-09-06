const CACHE_NAME = 'one-island-community-v36';
const ASSETS = [
  "./",
  "./index.html",
  "./form_proposal.pdf",
  "./facility_skybar.png",
  "./manifest.webmanifest",
  "./sec_facility.jpg",
  "./sec_ev_plain.jpg",
  "./rule_access.pdf",
  "./sec_cleaning_plain.jpg",
  "./sec_rental_plain.jpg",
  "./sec_moving_plain.jpg",
  "./rule_parking.pdf",
  "./sec_parking_plain.jpg",
  "./sec_phone.jpg",
  "./form_opinion.pdf",
  "./sec_doc.jpg",
  "./icon-192.png",
  "./rule_moving.pdf",
  "./sec_fee_plain.jpg",
  "./facility_gym.jpg",
  "./rule_broker.pdf",
  "./form_house_lease.docx",
  "./rule_facility.pdf",
  "./form_proposal.docx",
  "./sec_green.jpg",
  "./facility_mom.jpg",
  "./sec_broker_plain.jpg",
  "./form_ev.docx",
  "./form_house_lease.pdf",
  "./icon-512.png",
  "./form_ev.pdf",
  "./rule_ev.pdf",
  "./sec_access_plain.jpg",
  "./sec_move.jpg",
  "./sec_renovation_plain.jpg",
  "./form_vehicle_lease.pdf",
  "./sec_parcel_plain.jpg",
  "./rule_rental.pdf",
  "./rule_parcel.pdf",
  "./facility_lounge.jpg",
  "./sec_point.jpg",
  "./sec_welcome.jpg",
  "./hero.jpg",
  "./rule_cleaning.pdf",
  "./logo.png",
  "./form_renovation.pdf",
  "./rule_fee.pdf",
  "./berkeley_logo.jpg",
  "./sec_facility_plain.jpg",
  "./sec_form.jpg",
  "./apple-touch-icon.png",
  "./form_large_move.pdf",
  "./rule_renovation.pdf"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
