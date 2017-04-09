jest.mock('Geolocation', () => {
  return {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  }
});
