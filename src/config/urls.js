export default {
  apiKey: 'TKlNAjfUQ4IHVgZQrDwk7IGuiAk6Hx63CdUOPr1c',
  manifests: 'https://api.nasa.gov/mars-photos/api/v1/manifests/${missionKey}/?api_key=${apiKey}',
  photos: 'https://api.nasa.gov/mars-photos/api/v1/rovers/${missionKey}/photos?sol=${sol}&api_key=${apiKey}',
}
