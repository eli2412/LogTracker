module.exports = {
    IncomingForm: jest.fn().mockImplementation(() => ({
      parse: jest.fn((req, cb) => {
        cb(null, {}, {});
      }),
    })),
  };
  