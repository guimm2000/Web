import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class CadastrosController {
	public async index({ view }: HttpContextContract) {
		return view.render('cadastrar/index')
	}

	public async store({ response, request, session }: HttpContextContract) {
		const payload = await request.validate(RegisterValidator)

		const user = await User.create({email: payload.email, password: payload.password})

		return response.redirect().toRoute('home')
	}
}
