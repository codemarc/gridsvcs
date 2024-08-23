const { FusionAuthClient } = require('fusionauth-node-client')
const client = new FusionAuthClient(
   'Rbjw_h-Ja2EtjWQNSyZr4V9CvRdA3HUhowy-2Seu24nZWZ9h7Rm3V8mf',
   'http://localhost:9011'
)

function handleResponse(clientResponse) {
   // console.info(JSON.stringify(
   //    clientResponse.successResponse.user, null, 2)
   // )
   const user=clientResponse.successResponse.user
   console.dir(user)
   // user.data.gridsets=['personal']
   // await client.updateUser(JSON.stringify(user))


}

function handleError(error) {
   console.dir(error,{depth:10})
}
// Retrieve User by Email Address
client.tenantId = 'a7410a62-56f4-41ae-b448-b30adcd3f7b2'
client.retrieveUserByEmail('codemarc@gmail.com')
   .then(handleResponse)
   .catch(handleError)
