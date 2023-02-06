import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Video from 'App/Models/Video'
import User from 'App/Models/User'
import VideoValidator from 'App/Validators/VideoValidator'

export default class VideosController {
	public async index({ view }: HttpContextContract) {
		const videos = await Video.all()

		return view.render('videos/index', {videos: videos})
	}

	public async create({ view }: HttpContextContract) {
		return view.render('videos/create')
	}

	public async store({ auth, response, request, session }: HttpContextContract) {
		const payload = await request.validate(VideoValidator)

		var url = payload.url
		var i = url.indexOf('=');
		var splits = [url.slice(0,i), url.slice(i+1)];
		payload.url = "https://www.youtube.com/embed/"+splits[1]

		const user = auth.user

		const video = await user.related('videos_postados').create({titulo: payload.titulo, descricao: payload.descricao, url: payload.url})

		return response.redirect().toRoute('videos.index')
	}

	public async show({ params, view }: HttpContextContract) {
	    const idvideo = params.id
	    const video = await Video.findOrFail(idvideo)

	    return view.render('videos/show', { video: video })
  	}

}
