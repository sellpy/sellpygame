import sellpyBag from './sellpy_bag.png'
import startCopy from './start_copy.png'
import restart from './restart.png'
import startButton from './start_button.png'
import scissor1 from './scissor1.png'
import scissor2 from './scissor2.png'
import scissor3 from './scissor3.png'
import star from './star.png'
import cloud0 from './cloud0.png'
import cloud1 from './cloud1.png'
import cloud2 from './cloud2.png'


export const loadSprites = () => {
  loadSprite('start', startCopy)
  loadSprite('bag', sellpyBag)
  loadSprite('restart', restart)
  loadSprite('startButton', startButton)
  loadSprite('scissor1', scissor1)
  loadSprite('scissor2', scissor2)
  loadSprite('scissor3', scissor3)
  loadSprite('star', star)
  loadSprite('cloud0', cloud0)
  loadSprite('cloud1', cloud1)
  loadSprite('cloud2', cloud2)
}