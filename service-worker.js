const CACHE_NAME = 'one-island-community-v41';
const ASSETS = [
  "./",
  "./index.html",
  "./form_ev.docx",
  "./icon-512.png",
  "./sec_parking_plain.jpg",
  "./rule_ev.pdf",
  "./form_vehicle_lease.pdf",
  "./sec_phone.jpg",
  "./rule_renovation.pdf",
  "./rule_facility.pdf",
  "./rule_parking.pdf",
  "./facility_mom.jpg",
  "./sec_renovation_plain.jpg",
  "./sec_welcome.jpg",
  "./hero.jpg",
  "./sec_access_plain.jpg",
  "./rule_cleaning.pdf",
  "./form_large_move.pdf",
  "./sec_doc.jpg",
  "./form_house_lease.docx",
  "./sec_green.jpg",
  "./sec_rental_plain.jpg",
  "./logo.png",
  "./sec_broker_plain.jpg",
  "./sec_ev_plain.jpg",
  "./rule_fee.pdf",
  "./rule_rental.pdf",
  "./form_opinion.pdf",
  "./form_ev.pdf",
  "./facility_skybar.png",
  "./form_proposal.pdf",
  "./form_proposal.docx",
  "./sec_cleaning_plain.jpg",
  "./rule_broker.pdf",
  "./rule_access.pdf",
  "./sec_moving_plain.jpg",
  "./form_renovation.pdf",
  "./icon-192.png",
  "./form_house_lease.pdf",
  "./sec_move.jpg",
  "./apple-touch-icon.png",
  "./sec_parcel_plain.jpg",
  "./facility_gym.jpg",
  "./sec_fee_plain.jpg",
  "./sec_facility_plain.jpg",
  "./berkeley_logo.jpg",
  "./sec_facility.jpg",
  "./facility_lounge.jpg",
  "./manifest.webmanifest",
  "./sec_form.jpg",
  "./rule_moving.pdf",
  "./sec_point.jpg",
  "./rule_parcel.pdf"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
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
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
  );
});
