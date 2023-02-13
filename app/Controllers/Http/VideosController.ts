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

		return response.redirect().toRoute('videos.index');
	}

	public async show({ auth, params, view }: HttpContextContract) {
		const user = auth.user
	    const idvideo = params.id
	    const video = await Video.findOrFail(idvideo)
	    const videos = await user.related('videos_vistos').query()
	    var visto = false


		for(var i = 0; i < videos.length; i++) {
			if(video.id == videos[i].id) {
				visto = true
				break
			}
		}

	    return view.render('videos/show', { video: video, assistido: visto })
  	}

  	public async vistos({ auth, view, session }: HttpContextContract) {

  		const user = auth.user

  		await user.load('videos_vistos')

		return view.render('videos/seen', {videos: user.videos_vistos})
	}

	public async put({ auth, params, view}: HttpContextContract) {
		const user = auth.user
	    const idvideo = params.id
	    const video = await Video.findOrFail(idvideo)

	    const videos = await user.related('videos_vistos').query()
	    var visto = false


		for(var i = 0; i < videos.length; i++) {
			if(video.id == videos[i].id) {
				visto = true
				break
			}
		}

		if(visto) {
			await user.related('videos_vistos').detach([video.id])
		}  
		else {
			await user.related('videos_vistos').attach([video.id])
		}
	}
}