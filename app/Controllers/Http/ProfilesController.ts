import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfilesController {
	public async show({view}: HttpContextContract) {
		return view.render('profile/show')
	}

}
