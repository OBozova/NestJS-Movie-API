# NestJS Movie API
## Simple Nestjs app for crud functions on movies

Before cloning this repo we need to configure and get a connection url from any postgresql database. After getting the connection url I did used environment variable as DATABASE_URL. If we configure the url and added as environment variable we can good to clone this repo.

After we clone this repo we should install the packages.
I used pnpm but with npm it should be similar. We use below command for installation.
```sh
pnpm install
```

After installation is complete we can start the application. We use below command and it will start.
```sh
pnpm run start
```

Home page is just say hello and does not do anything. And also with browser we can reach the swagger. If we are using localhost the link will be
[http://localhost:3000/api/](http://localhost:3000/api/)

It is also writing logs on local computer. We can change middleware part and send it to some other logging platforms.

Purpose of this application it has some simple crud function with using nestjs and typeorm. It has 2 type one of them is movie and the other one is genre. They have many to many connection one movie can have more than one genre and also genres can be connected with more than one movie.
This movies and genres have some rules which are:
* Genre must be exist for adding or updating a movie. If genre does not exist in the movie it cannot be created or updated.
* Bot genres and movies can be added removed and updated.
* If one genre is deleted it will deleted from all of its related movies.
* Genre without and movie can be exist.
* Movies without a genre can be exist movie can be updated added to it later.
* Movies and genres have pagination with skip and take parameters.
* Movies can be search with movie name or genre.
* Cannot be 2 genres with same name.
* 2 movie Cannot be in the same year have the same name.

I will add postman collection into the repo so anyone can use and try out this application.