import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Video from 'App/Models/Video'
import { column, beforeSave, BaseModel, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @hasMany(() => Video)
  public videos_postados: HasMany<typeof Video>


  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public nome: string | null

  @column()
  public twitter: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
