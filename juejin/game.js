require('./js/libs/weapp-adapter')
window.p2 = require('./js/libs/p2')
window.PIXI = require('./js/libs/pixi')
window.Phaser = require('./js/libs/phaser-split')




// 定义全局常量
window.WIDTH = 750                     // 游戏宽度
window.SCALE = WIDTH / canvas.width    // 游戏宽度/ canvas 宽度
window.HEIGHT = canvas.height * SCALE  // 游戏高度

// go: Global Object 用于在 state 之间共享数据和方法
window.go = {
  game: null,                      // 游戏实例
  userInfo: null,                  // 玩家信息
  opponentInfo: null,              // 对手信息
  common: null,                    // 公共函数
  server: null,                    // 与服务器的交互
  launchRoomId: null,              // 进入主菜单时需要加入的房间 id
  battle: null,                    // 对战状态
  common: require('js/common'),  // 公共函数         // 修改这行
}

// 初始化游戏
const config = {
  width: WIDTH,             // 游戏世界宽度
  height: HEIGHT,           // 游戏世界高度
  renderer: Phaser.CANVAS,  // 渲染器，这里我们使用 canvas
  canvas: canvas            // 将游戏绘制在 adapter 为我们创建的 canvas 上
}


const game = new Phaser.Game(config)                   // 创建游戏
// 全局对象中保存一个 game 的引用
go.game = game
// 注册游戏场景
game.state.add('start', require('./js/states/start'))  // 添加 start 游戏场景
game.state.add('menu', require('./js/states/menu'))  // 添加主菜单的场景
game.state.add('practice', require('./js/states/practice'))  //单机
game.state.start('start')
