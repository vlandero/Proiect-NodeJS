# Movie Database
## Intro
Aplicatia prezinta o baza de date de filme si recenziile acestora, lasata de utilizatori. Oricine poate vedea filmele si recenziile, dar doar utilizatorii care au cont pe platforma pot adauga recenzii.
## Setup
Pentru a rula aplicatia, trebuie descarcat proiectul si rulata comanda `npm install` pentru instalarea pachetelor, apoi `npm start` pentru rularea aplicatiei. Aplicatia este scrisa in typescript, iar buildul se va face odata cu rularea comenzii `npm start` in folderul `/build`, de unde va fi rulata aplicatia `.js`.
## Environment variables
In fisierul `.env` se vor introduce variabilele de environment:
```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET=
```
Primele 4 variabile sunt legate de conexiunea la baza de date, iar ultima este secretul cu care sunt create tokenele JWT.
## Technical details
- Parolele sunt stocate in baza de date hashuite, cu ajutorul librariei `bcrypt`
- Se foloseste libraria `zod` pentru validarea modelelor
### Middlewares
- `verifyToken` - verifica tokenul JWT pus in headerul `authorization`, apoi seteaza in `req.user` userul aferent JWT-ului pentru a il folosi mai departe in API.
- `isAdmin` - verifica daca `req.user` este admin, pentru a asigura drepturi pentru anumite calluri
- `validateSchema(schema)` - valideaza payload-ul conform unei `schema` date ca parametru
- `multer` - librarie, parseaza `form-data` in cazul trimiterii unei imagini
## DTOs
```
class MovieDTO {
  id!: number;
  title!: string;
  coverImage?: string;
  rating?: number;
  totalReviews?: number;
  reviews?: ReviewDTO[];
  date_added!: Date;
  date_updated!: Date;
}

class MovieInListDTO {
  id!: number;
  title!: string;
  coverImage?: string;
  rating?: number;
  totalReviews?: number;
}

export class ReviewDTO {
  id!: number;
  rating!: number;
  descrtiption!: string;
}

export class UserDTO {
  id!: number;
  email!: string;
  admin!: boolean;
}

```
## API documentation
`POST /user/register` - inregistreaza un user
```
{
    "email": "email@mail.com",
    "password": "min6characterpassword"
}
```

`POST /user/login` - logheaza un user si returneaza tokenul JWT care poate fi folosit ulterior pentru autentificare
```
{
    "email": "email@mail.com",
    "password": "password"
}
```

`DELETE /user/delete` - sterge un user. Callul trebuie sa fie facut cu un bearer token (JWT), iar userul sters va fi cel care corespunde JWT-ului.
`GET /movies` - obtine lista cu toate filmele, rezultatul obtinut este de tipul `MovieInListDTO[]`
`GET /movie/:id` - obtine informatii despre un singur film, cu recenziile aferente. Rezultatul este de tipul `MovieDTO`
`POST /movie/add` - adauga un film, doar userii admini pot face acest lucru.
```
{
    "title": "string",
    "description": "Optional string"
}
```
`DELETE /movie/:id` - sterge un film dupa id, doar userii admini pot face acest lucru.