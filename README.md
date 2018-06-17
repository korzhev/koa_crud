# koa_crud

## Notes
* Docker image and docker compose is not ready
* PUT and PATCH methods are similar. PUT as PATCH updates fields instead of replacing objects(mongoose behavior)
* No api tests
* No frontend
* No db dump or data generation
* index only for geosearch
* minimum dependencies

## Requirements
MongoDB 3.6
Mongo was chosen because it supports query operations on geospatial data and also it is primary db in company.

## Install
`npm i`

## Folders
* src - source code
* test - tests

## Scripts
`npm test` - test
see more(coverage, lint, hooks) at `package.json`

## Usage
make sure mongo is up and available. 

`npm start`, go to [http://localhost:3000/v1/pois](http://localhost:3000/v1/pois)

You can change server port and mongouri using ENV variables or `src/config/index.js`

## Examples

Add object:
```
curl -XPOST -H "Content-type: application/json" -d '{                                                                          
    "location": {
        "type": "Point",
        "coordinates": [
            10,
            10
        ]
    },
    "deleted": false,
    "name": "pupa",
    "type": "hotel"
}' 'http://localhost:3000/v1/pois'

```

Get one object with only one field "name":
`http://localhost:3000/v1/pois/5b264dc7bdb0c654f51bc658?select={"name":1}`


Get two objects skiping first one
`http://localhost:3000/v1/pois?limit=2&skip=1`

Get objects near point with radius
```
http://localhost:3000/v1/pois?filter={
  "location": {
    "$near": {
      "$geometry": { "type": "Point", "coordinates": [ -0.1, 0 ] },
        "$maxDistance": 50000
    }
  }
}
```

Change object
```
curl -XPUT -H "Content-type: application/json" -d '{                                                                           
    "location": {
        "type": "Point",
        "coordinates": [
            10,
            10
        ]
    },
    "name": "lupa" 
}' 'http://localhost:3000/v1/pois/5b264dc7bdb0c654f51bc658'

```

## Using query string
Available params for GET all method:
* filter - filter docs using mongo query syntax
* select - select fields using mongo query syntax
* sort - sort objects using mongo query syntax
* limit - number
* skip - number

Available params for GET one method:
* select - select fields using mongo query syntax
