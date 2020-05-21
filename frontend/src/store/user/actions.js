export async function LOGIN({commit, dispatch}, payloads) {
  const response = await this._vm.$axios.post('/auth/login', payloads);
  if (response.isSuccess) {
    const data = response.result.data;

    localStorage.setItem(process.env.TOKEN_NAME, data.token);
    this._vm.$axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    this._vm.$q.notify({
      color: 'teal',
      message: 'Login success',
      position: 'top-right'
    });

    commit('setLoginStatus', true);
    dispatch('helper/CLEAR_REMEMBER_TAB', null, {root: true});

    return this.$router.replace('/admin');
  }

  return response.result
}

export async function LOGOUT({commit, state}) {
  if (state.isLogged) {
    localStorage.removeItem(process.env.TOKEN_NAME);

    this._vm.$q.notify({
      color: 'teal',
      message: 'Logout success',
      position: 'top-right'
    });

    commit('setLoginStatus', false);

    this.$router.replace('/login');
  }
}

export async function getList({commit}) {
  const response = await this._vm.$axios.get('/user');

  if (response.isSuccess) {
    commit('setList', response.result.data);
  }
}

export async function updateInfo({commit}, payload) {
  const response = await this._vm.$axios.put('/user', payload);

  if (response.isSuccess) {
    this._vm.$q.notify({
      color: 'teal',
      message: 'Update info success',
      position: 'top-right'
    });

    return commit('setUser', response.result.data);
  }

  this._vm.$q.notify({
    color: 'negative',
    message: 'Update info failed',
    position: 'top-right'
  });
}

export async function uploadAvatar({commit}, file = null) {
  if (file) {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await this._vm.$axios.put('/auth/user/upload-avatar', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    if (response.isSuccess) {
      this._vm.$q.notify({
        color: 'teal',
        message: 'Update avatar success',
        position: 'top-right'
      });

      return response.result.data;
    }
  }

  this._vm.$q.notify({
    color: 'negative',
    message: 'Missing file or upload failed. Please contact administrator!',
    position: 'top-right'
  });

  return false;
}

export async function loadUser({commit}) {
  const response = await this._vm.$axios.get('/auth/user/info');
  if (response.isSuccess) {
    commit('setUser', response.result.data);
  } else {
    this._vm.$q.notify({
      color: 'negative',
      message: 'Session invalid!',
      position: 'top-right'
    });

    localStorage.removeItem(process.env.TOKEN_NAME);
    this.$router.replace('/login');
  }
}
