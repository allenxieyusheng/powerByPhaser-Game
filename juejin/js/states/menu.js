/**
 * 主菜单
 */

/**
 * 单机练习按钮回调
 */
function practice() {
    console.log("单机游戏开始");
    this.game.state.start('practice')
 }

/**
 * 好友对战按钮回调
 */
function battle() { console.log('battle') }

/**
 * 排行榜按钮回调
 */
function rank() { console.log('rank') }

/**
 * 添加主菜单
 */
function addMenu() {
  [
    // x    y     按钮文本    回调函数
    [  248, 750,  "单机练习", practice],
    [  248, 900,  "好友约战", battle],
    [  248, 1050, "好友排行", rank],
  ].map((btnConfig) => {
    // 调用 common 中的 addBtn 函数创建按钮
    go.common.addBtn({ 
      x: btnConfig[0],
      y: btnConfig[1],
      text: btnConfig[2],
      callback: btnConfig[3],
    })
  })
}

class Menu extends Phaser.State {
  create() {
    // 背景图
    this.add.image(0, 0, 'bg_menu')
    // 添加主菜单
    addMenu()
  }
}

module.exports = Menu
