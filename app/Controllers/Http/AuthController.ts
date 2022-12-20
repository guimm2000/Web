import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
	public async create({ view }: HttpContextContract) {
		return view.render('auth/create')
	}

	public async store({ auth, response, request, session }: HttpContextContract) {
	    const payload = await request.validate(LoginValidator)

	    try {
	      await auth.use('web').attempt(payload.email, payload.password)
	    } catch {
	    	session.flash('Erro de login', 'erro')
			return response.redirect().toRoute('auth.create')
		}
	    return response.redirect().toRoute('home')
	}

	public async destroy({ auth, response }: HttpContextContract) {
	    await auth.use('web').logout()
	    return response.redirect().toRoute('auth.create')
  	}
}
