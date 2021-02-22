# API Keys Generator

## Technologies Used
* Server: Node JS
* Dependencies
  * Express
  * Jest and Supertest (For Testing)

## Database 
Keys are stored as attributes in two local JSON objects (/randomApi/db). `availableKeys` store keys which are available to be served and `blockedKeys` store the ones currently served.

## Time Complexity
Since JSON objects are essentially Hashmaps, accessing, deleting and inserting keys take O(1).
The only downside is that always the first key from the hashmap is served. This can be avoided by getting an array of all object keys (API keys) and getting one at random, but then it would take the complexity of serving a key at O(N).
 
## API Endpoints
* /api/generate (GET) - Generating new API Key
* /api/serve (GET) - Serving avaiable API Key
* /api/unblock/:key (PATCH) - Unblocking an API Key
* /api/delete/:key (POST) - Deleting an API Key
* /api/keep_alive/:key (PATCH) - Reclocking existing API Key so it doesn't get deleted and remains served to the current user for 1 more minute
