import { createProxyClient } from '@ptsq/client';
import { BaseRouter } from './server';
//import { BaseRouter } from './schema.generated';

const client = createProxyClient<BaseRouter>({
  url: 'http://localhost:4000/ptsq',
});

client.user.get
  .query({
    name: '',
  })
  .then((result) => console.log(result));

client.greetings
  .query({
    name: 'John',
  })
  .then((result) => {
    console.log(`Hover over the result variable to see it is a string.`);
    console.log('result =', result);
  })
  .catch((error) => {
    console.error(JSON.stringify(error.response.data.info));
  });
