const { FusionAuthClient } = require('fusionauth-node-client')

const client = new FusionAuthClient(
   'Rbjw_h-Ja2EtjWQNSyZr4V9CvRdA3HUhowy-2Seu24nZWZ9h7Rm3V8mf',
   'http://localhost:9011'
)

async function handleResponse(clientResponse, userdata) {
   const user = clientResponse.successResponse.user
   console.dir(user)
   user.data = userdata
   updateResponse = await client.updateUser(user.id, { user })
   console.dir(updateResponse)
}

async function handleError(error) {
   console.dir(error, { depth: 10 })
}

// Retrieve User by Email Address
client.tenantId = 'a7410a62-56f4-41ae-b448-b30adcd3f7b2'

// for info
client.retrieveUserByEmail('info@codemarc.net')
   .then((clientResponse) => handleResponse(clientResponse, { grids: 'builtin' }))
   .catch(handleError)

// for codemarc
client.retrieveUserByEmail('codemarc@gmail.com')
   .then((clientResponse) => handleResponse(clientResponse, { grids: 'builtin:personal' }))
   .catch(handleError)



