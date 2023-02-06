import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserVideos extends BaseSchema {
  protected tableName = 'user_video'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('video_id').unsigned().references('videos.id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
