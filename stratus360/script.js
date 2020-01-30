const fetch = require('node-fetch');

function fetchUrl(url) {
  fetch(url)
    .then(function(response) {
      // The API call was successful!
      console.log('success!', response);
    })
    .catch(function(err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
}

fetchUrl('http://xkcd.com/info.0.json');
