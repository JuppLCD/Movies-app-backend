## Backend de una APP WEB de peliculas

URL_DEPLOY = https://movies--backend.herokuapp.com/
API_URL = /api/v1/

### Users

##### Create User

```
POST /user/register
Content-Type: application/json

{
    "name": string,
    "password": string,
    "passwordConfirm": string
}
```

##### Login (no token)

```
POST /user/login
Content-Type: application/json

{
    "name": string,
    "password": string,
}
```

##### Login (token)

```
POST /user/login
authorization: token
```

##### User info (lists, movies)

```
GET /user/info
authorization: token
```

### Lists

##### User lists

```
GET /list
authorization: token
```

##### Create list

```
POST /list/create
authorization: token
Content-Type: application/json

{
    "name": string,
}
```

##### Rename list

```
PUT /list/update/:listId
authorization: token
Content-Type: application/json

{
"name": string,
}

```

##### Delete list

```
DELETE /list/delete/:listId
authorization: token
```

### Movies

##### Movies from a list

```
GET /list/:listId/movies
authorization: token
```

##### Add Movie

```
GET /list/:listId/movies/add/:movieId
authorization: token
```

##### Remove Movie

```
GET /list/:listId/movies/remove/:movieId
authorization: token
```
