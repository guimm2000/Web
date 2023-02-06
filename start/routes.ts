/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('home').as('home')

Route.get('/login', "AuthController.create").as('auth.create');
Route.post('/login', "AuthController.store").as('auth.store');

Route.get('/logout', "AuthController.destroy").as('auth.destroy');

Route.get('/cadastrar', "CadastrosController.index").as('cadastrar.index');
Route.post('/cadastrar', "CadastrosController.store").as('cadastrar.store');

Route.get('/profile', "ProfilesController.show").as('profile.show').middleware(['auth']);
Route.get('/profile/editar', "ProfilesController.create").as('profile.create').middleware(['auth']);
Route.post('/profile/editado', "ProfilesController.store").as('profile.store').middleware(['auth']);

Route.get('/videos', "VideosController.index").as('videos.index').middleware(['auth']);
Route.get('/videos/submeter', "VideosController.create").as('videos.create').middleware(['auth']);
Route.post('/videos/submeter', "VideosController.store").as('videos.store').middleware(['auth']);
Route.get('/videos/:id', "VideosController.show").as("videos.show").middleware(['auth']);