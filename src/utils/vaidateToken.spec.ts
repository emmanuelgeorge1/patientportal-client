import validateToken from './validateToken';

describe('validateToken', () => {
  beforeAll(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
  });
  it('should create', () => {
    expect(validateToken).toHaveBeenCalled;
  });
});
