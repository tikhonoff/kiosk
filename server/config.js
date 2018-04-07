export default {
  baseURL: 'http://localhost:3000',
  database: {
    address: 'mongodb://localhost:27017/slides',
  },
  upload: {
    maxImageSize: 5000 * 1000,
    imageTypes: [
      'png', 'jpg', 'jpeg', 'gif',
    ],
    imageMimeTypes: [
      'image/png', 'image/jpeg', 'image/gif',
    ],
  },
};
