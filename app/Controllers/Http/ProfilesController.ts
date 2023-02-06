import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ProfileValidator from 'App/Validators/ProfileValidator'

export default class ProfilesController {
	public async show({view}: HttpContextContract) {
		return view.render('profile/show')
	}

	public async create({view, session}: HttpContextContract) {
		return view.render('profile/create')
	}

	public async store({auth, session, request, response}: HttpContextContract) {
		const payload = await request.validate(ProfileValidator)

		auth.user.nome = payload.nome
		auth.user.twitter = payload.twitter

		await auth.user.save()

		return response.redirect().toRoute('profile.show')
	}
}
