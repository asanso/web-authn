const cose_alg_ECDSA_w_SHA256 = -7;
const challenge = 'random-string-generated-by-rp-server';

const register = () => {
  let user = {
    id: new TextEncoder().encode(email.value),
    name: email.value,
    displayName: display_name.value
  };
  console.debug('register', user);

  navigator.credentials.create({
    publicKey: {
      challenge: new TextEncoder().encode(challenge),
      pubKeyCredParams: [{
        type: 'public-key',
        alg: cose_alg_ECDSA_w_SHA256
      }],
      rp: {
        id: location.host,
        name: 'Nov Sample'
      },
      user: user
    }
  }).then(registered);

  return false;
};

const registered = (attestation) => {
  console.debug(attestation);
  localStorage.setItem('key_id', attestation.id);
  setup();
};

const authenticate = () => {
  console.debug('authenticate', {key_id: key_id.value});
  return false;
};

const setup = () => {
  key_id.value = localStorage.getItem('key_id');
};

registration.addEventListener('submit', register);
authentication.addEventListener('submit', authenticate);
setup();