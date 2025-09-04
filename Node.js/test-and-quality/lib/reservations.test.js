const Reservation = require('./schema/reservation');

describe('fetch', () => {
  let reservations;

  beforeAll(() => {
    jest.mock('./reservations');
    reservations = require('./reservations');
  });

  afterAll(() => {
    jest.unmock('./reservations')
  })

  it('should be mocked and not create a database record', () => {
    expect(reservations.fetch()).toBeUndefined()
  })
})

describe('save', () => {
  let reservations;
  const mockDebug = jest.fn();
  const mockInsert = jest.fn().mockResolvedValue([1]);

  beforeAll(() => {
    jest.mock('debug', () => () => mockDebug);
    jest.mock('./knex', () => () => ({
      insert: mockInsert,
    }));
    reservations = require('./reservations');
  });

  afterAll(() => {
    jest.unmock('debug');
    jest.unmock('./knex');
  });

  it('should resolve with the id upon success', async () => {
    const value = {foo: 'bar'}
    const expected = [1];
    const actual = await reservations.save(value);
    expect(actual).toStrictEqual(expected);
    expect(mockDebug).toHaveBeenCalledTimes(1);
    expect(mockInsert).toHaveBeenCalledWith(value);
  });
});

describe('validate', () => {
  let reservations;

  beforeAll(() => {
    reservations = require('./reservations');
  })

  it('should resolve with no optional fields', async () => {
    const reservation = new Reservation({
      date: '2017/06/10',
      time: '06:02 AM',
      party: 4,
      name: 'Family',
      email: 'username@example.com'
    });

    await expect(reservations.validate(reservation))
      .resolves.toEqual(reservation);
  });

  it('should reject with empty email', async () => {
    const reservation = new Reservation({
      date: '2017/06/10',
      time: '06:02 AM',
      party: 4,
      name: 'Family',
      email: 'username'
    });

    await expect(reservations.validate(reservation))
      .rejects.toBeInstanceOf(Error);
  })

  it('should be called and reject empty input', async () => {
    const mock = jest.spyOn(reservations, 'validate');

    const value = undefined;

    await expect(reservations.validate(value))
      .rejects.toThrow('Cannot read properties of undefined (reading \'validate\')');

    expect(mock).toHaveBeenCalledWith(value);

    mock.mockRestore();
  })
})

describe('create', () => {
  let reservations;

  beforeAll(() => {
    reservations = require('./reservations');
  })

  it('create should reject if validate fails', async () => {
    const original = reservations.validate;

    const error = new Error('fail');

    reservations.validate = jest.fn(() => Promise.reject(error));

    await expect(reservations.create())
      .rejects.toBe(error);

    expect(reservations.validate).toHaveBeenCalledTimes(1);

    reservations.validate = original;
  });

  it('should reject if validation using spy on', async () => {
    const mock = jest.spyOn(reservations, 'validate');

    const error = new Error('fail');

    mock.mockImplementation(() => Promise.reject(error));

    const value = 'puppy';

    await expect(reservations.create(value)).rejects.toEqual(error);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(value);

    mock.mockRestore();
  })

  it('create should reject if validate fails', async () => {
    const expectedId = 1;

    const mockInsert = jest.fn().mockResolvedValue(expectedId);

    jest.mock('./knex', () => ({
        insert: mockInsert,
      })
    );

    reservations = require('./reservations');

    const mockValidation = jest.spyOn(reservations, 'validate');
    mockValidation.mockImplementation(value => Promise.resolve(value));

    const reservation = {foo: 'bar'};

    await expect(reservations.create(reservation))
      .resolves.toStrictEqual(expectedId);

    expect(reservations.validate).toHaveBeenCalledTimes(1);
    expect(mockValidation).toHaveBeenCalledWith(reservation);
    expect(mockValidation).toHaveBeenCalledTimes(1);

    mockValidation.mockRestore();
    jest.unmock('./knex');

  });
})



