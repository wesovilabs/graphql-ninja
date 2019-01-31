curl 'http://localhost:7000/graphql' \
  -d '{
    "query": "mutation($input:VoteRequest){vote(request:$input){name}}",
    "variables": {
      "input": {
        "eventId":"5c529d40fd30d9001fc35ece",
        "name":"Jane Doe",
        "score": 2,
        "comment":"No me gusta como viste el ponente"
      }
    }
  }' \
  -H "Content-Type: application/json"
