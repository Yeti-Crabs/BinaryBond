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
        firstname: 'Kwon123',
        lastname: 'Kwon123',
        bio: 'New Kwon123 Bio',
        subjects: 'New Kwon123 subjects',
        email: 'Kwon123@gmail.com',
        skilllevel: '1',
      })
    );

    expect(newState).toEqual({
      user_id: '111',
      firstname: 'Kwon123',
      lastname: 'Kwon123',
      bio: 'New Kwon123 Bio',
      subjects: 'New Kwon123 subjects',
      email: 'Kwon123@gmail.com',
      skilllevel: '1',
    });
  });

  it('should handle update', () => {
    const initialState = {
      user_id: '111',
      firstname: 'Kwon123',
      lastname: 'Kwon123',
      bio: '',
      subjects: '',
      email: '',
      skilllevel: '',
    };

    const newState = userSlice.reducer(
      initialState,
      update({
        bio: 'New Kwon123 bio',
        subjects: 'New Kwon123 subjects',
      })
    );

    expect(newState).toEqual({
      user_id: '111',
      firstname: 'Kwon123',
      lastname: 'Kwon123',
      bio: 'New Kwon123 bio',
      subjects: 'New Kwon123 subjects',
      email: '',
      skilllevel: '',
    });
  });
});
