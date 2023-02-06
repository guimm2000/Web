import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ProfilesController {
	public async show({view}: HttpContextContract) {
		return view.render('profile/show')
	}

	public async create({view, session}: HttpContextContract) {
		return view.render('profile/create')
	}

	public async store({auth, session, request, response}: HttpContextContract) {
		const {nome, twitter} = request.all()

		auth.user.nome = nome
		auth.user.twitter = twitter

		await auth.user.save()

		return response.redirect().toRoute('profile.show')
	}
}
