import md5 from 'crypto-js/md5';

const getAvatar = (email) => {
  const gravatarImage = md5(email).toString();
  const ENDPOINT = `https://www.gravatar.com/avatar/${gravatarImage}`;
  const fetchGravatar = () => fetch(ENDPOINT).then((response) => response.url);
  return fetchGravatar;
};

export default getAvatar;
