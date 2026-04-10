import config from '../../config.js';

const profile = async function profile() {
  try {
    const token = await localStorage.getItem('authToken'); //LOADED TOKEN
    if (token) {
      console.log('Token loaded in profile.js: ', token);
    } else console.log('no token');
    console.log('Triggered profile.js');
    const response = await fetch(`${config.API_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
    });

    //REDIRECTING IF 200
    if (response.ok) {
      window.location.href = `/admin/admin.html`;
    } else {
      console.log('No auth');
    }
    //

    const result = await response.json();
    console.log('Profile result:', result);
  } catch (error) {
    console.log('Profile error message: ', error.message);
  }
};

export { profile };
