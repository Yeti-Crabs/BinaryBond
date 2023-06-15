import { login, update, userSlice } from '../client/store/userSlice.js';

describe('userSlice', () => {
  it('should handle login', () => {
    const initialState = {
      user_id: '',
      firstname: '',
      lastname: '',
      bio: '',
      subjects: '',
      email: '',
      skilllevel: '',
    };

    const newState = userSlice.reducer(
      initialState,
      login({
        user_id: '111',
        firstname: 'User123',
        lastname: 'User123',
        bio: 'New User123 Bio',
        subjects: 'New User123 subjects',
        email: 'User123@gmail.com',
        skilllevel: '1',
      })
    );

    expect(newState).toEqual({
      user_id: '111',
      firstname: 'User123',
      lastname: 'User123',
      bio: 'New User123 Bio',
      subjects: 'New User123 subjects',
      email: 'User123@gmail.com',
      skilllevel: '1',
    });
  });

  it('should handle update', () => {
    const initialState = {
      user_id: '111',
      firstname: 'User123',
      lastname: 'User123',
      bio: '',
      subjects: '',
      email: '',
      skilllevel: '',
    };

    const newState = userSlice.reducer(
      initialState,
      update({
        bio: 'New User123 bio',
        subjects: 'New User123 subjects',
      })
    );

    expect(newState).toEqual({
      user_id: '111',
      firstname: 'User123',
      lastname: 'User123',
      bio: 'New User123 bio',
      subjects: 'New User123 subjects',
      email: '',
      skilllevel: '',
    });
  });
});
