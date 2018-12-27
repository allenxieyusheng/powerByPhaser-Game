/**
 * 开始 state ，负责检查加载资源文件以及申请获得玩家基本资料
 */

/**
 * 创建“开始”按钮，点击后获取用户基本信息并调用回调，若用户拒绝则没有任何效果
 */
function addStartBtn(cb) {
  const config = {
   type: 'Image',
   image: 'images/btn_start.png',
   style: {
     left: 248 / SCALE,   // 除以 SCALE 是为了将设计稿尺寸转为 canvas 实际尺寸
     top: 870 / SCALE,
     width: 254 / SCALE,
     height: 91 / SCALE,
   },
 }
 // wx.createUserInfoButton() 是小游戏 API ，用于创建获取用户信息的按钮，
 // 文档链接：https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
 const startBtn = wx.createUserInfoButton(config)
 startBtn.onTap((res) => {
   // 若用户拒绝授权，则返回值没有 userInfo 值
   if (res.userInfo) {
     cb(res.userInfo)
   }
 })
 return startBtn
}

class Start extends Phaser.State {
  /**
   * Phaser state 的 preload 生命周期可以用来预加载游戏资源
   */
  //生命周期
  preload() {
    // 配置画面缩放
       this.scale.pageAlignHorizontally = true
       this.scale.pageAlignVertically = true
       this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
       // 预加载资源
       this.load.image('bg_menu', 'images/bg_menu.png')
       this.load.image('bg_playing', 'images/bg_playing.png')
       this.load.image('bg_rank', 'images/bg_rank.png')
       this.load.image('bg_waiting', 'images/bg_waiting.png')
       this.load.image('avatar', 'images/avatar.png')
       this.load.image('avatar_unknow', 'images/avatar_unknow.png')
       this.load.image('btn', 'images/btn_menu.png')
       this.load.image('o', 'images/o.png')
       this.load.image('x', 'images/x.png')
       this.load.image('row', 'images/rank_row.png')
       this.load.image('avatars', 'images/result_avatars.png')
       this.load.image('win', 'images/result_win.png')
       this.load.image('lose', 'images/result_lose.png')
       this.load.image('draw', 'images/result_draw.png')
       this.load.image('bunting', 'images/bunting.png')
  }

  /**
   * Phaser create 生命周期用来初始化游戏场景
   */
  create() {
    // 添加一个图片作为背景
    this.game.add.image(0, 0, 'bg_menu');
    // 添加“开始游戏”按钮
    const startBtn = addStartBtn((userInfo) => {
      // 销毁开始按钮
      startBtn.destroy()
      // 将玩家信息存入 global object
      go.userInfo = userInfo
      // 预加载玩家头像，微信头像为空则不加载
      if (go.userInfo.avatarUrl !== '') {
        this.load.image(go.userInfo.avatarUrl, go.userInfo.avatarUrl)
        // 在 preload 生命周期函数以外进行的资源加载必须手动开始加载
        this.load.start()
      }
      //  场景的切换 跳转主菜单场景
      this.game.state.start('menu')
    })
  }
}

module.exports = Start
