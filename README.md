<p align="center">
  <a href="https://fr.wikipedia.org/wiki/Blood_on_the_Clocktower" target="blank"><img src="https://cf.geekdo-images.com/HINb2nkFn5IiZxAlzQIs4g__imagepage/img/PRMxYnMvgHcv9FH2LxG7p_2rvtE=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7009391.jpg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">API backend permettant de gérer des parties du jeu Blood on the Clocktower, incluant la création de parties, la gestion des joueurs, des rôles, et le suivi du déroulement des nuits et jours.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

## Base de données
### .env
URL de ta base de donnée
```dotenv
DATABASE_URL=
```
### Initialisation
```bash
npx prisma db push
npx prisma generate
```

## JWT
### .env
Variable d'environement pour genere le hash des tokens
```dotenv
JWT_SECRET=
```



## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
