import kaboom from 'kaboom'
import {loadSprites} from './sprites/sprites'

kaboom({
  fullscreen: true,
  background: [255, 255, 255],
  debug: true
})
loadSprites()


let co2Count = 0
let highScore = 0

scene('game', () => {
  const obstacleCleanupper = add([
    pos(150, 0),
    rect(20, height()),
    area(),
    opacity(0),
    'obstacleCleanupper'
  ])

  const ui = add([
    layer('ui')
  ]);


  // init player



  const player = add([
    // List of components, each offers a set of functionalities
    sprite('bag'),
    pos(200, height() / 2),
    area({ scale: 0.4 }),
    health(1),
    scale(0.4),
    origin('center'),
    // Plain strings are tags, a quicker way to let us define behaviors for a group
    'player',
    'friendly',
    // Components are just plain objects, you can pass an object literal as a component.
  ])

  onKeyDown('up', () => {
    if (player.pos.y > 0 && gameHaveStarted)
      player.pos.y = player.pos.y - 3

  })

  onKeyDown('down', () => {
    if (player.pos.y < height() && gameHaveStarted)
      player.pos.y = player.pos.y + 3
  })

  onKeyDown('right', () => {
    if (player.pos.x < width() && gameHaveStarted)
      player.pos.x = player.pos.x + 3

  })

  onKeyDown('left', () => {
    if (player.pos.x > 0 && gameHaveStarted)
      player.pos.x = player.pos.x - 3

  })

  // Spawn in player
  //player.moveTo(200, height()/2)

  // init player

  player.onUpdate(() => {
    if (gameHaveStarted) {
      add([
        pos(player.pos.x - 30, player.pos.y + 20),
        sprite('star'),
        origin('center'),
        scale(0.2),
        area(),
        lifespan(0.6, { fade: 0.3 }),
        move(rand(100, 200), rand(60, 240))
      ])



      obstacleCleanupper.pos.x = player.pos.x


    }
    //addKaboom(player.pos)

  })

  ui.on('draw', () => {

    if (gameHaveStarted) {
      drawText({
        text: co2Count,
        size: 20,
        font: 'apl386',
        pos: vec2(width() - 50, 50),
        color: rgb(0, 0, 0),
      })
      drawText({
        text: highScore,
        size: 20,
        font: 'apl386',
        pos: vec2(width() - 50, 90),
        color: rgb(244, 100, 50),
      })
    }
  });


  // init world
  // Ground



  const startButton = add([
    pos(width() / 2, height() - 200),
    text('Click here to lower your CO2 emission', {
      size: 25, // 48 pixels tall
      width: 700,
      font: 'apl386'
    }),
    color(hsl2rgb(255, 1, 0)),
    origin('center')
  ])





  const _start = () => {

    if (!gameHaveStarted) {
      gameHaveStarted = true
      destroy(startButton)
    }

  }

  let gameHaveStarted = false


  onKeyPress(_start)
  onMousePress(_start)

  let scissor

  // obstacles
  loop(1, () => {
    if (gameHaveStarted) {
      // spawn Scissor
      const spawnY = player.pos.y
      const seed = Math.floor(Math.random() * 3) + 1
      scissor = add([
        sprite(`scissor${seed}`),
        area({ scale: 0.9 }),
        pos(width() + 100, spawnY),
        origin('botleft'),
        color(255, 255, 255),
        move(LEFT, 800),
        scale(0.5),
        rotate(45),
        origin('center'),
        'obstacle',
        'scissor'
      ]);

      // loop(0.01, () => {
      //   scissor.angle += 5
      // })
    }
  })

  loop(0.3, () => {
    if (gameHaveStarted) {
      // spawn CO2
      const seed = Math.floor(Math.random() * 3)
      const spawnY = Math.floor(Math.random() * height())
      add([
        sprite(`cloud${seed}`),
        area({ scale: 0.5 }),
        pos(width() + 100, spawnY),
        origin('botleft'),
        color(255, 255, 255),
        move(LEFT, 300),
        scale(0.5),
        opacity(0.7),
        origin('center'),
        'obstacle',
        'co2'
      ]);
    }
  })

  // Clean up obstacles
  onCollide('obstacleCleanupper', 'obstacle', (p, a) => {
    wait(5, () => {
      destroy(a)
    })
  });

  // Count co2
  onCollide('obstacleCleanupper', 'co2', (p, a) => {
    co2Count = co2Count + 1
  });

  // Collisions
  onCollide('player', 'obstacle', (p, a) => {
    addKaboom(player.pos)
    player.hurt(1)
  });

  // Death
  player.on('death', () => {
    addKaboom(player.pos)
    destroy(player)
    wait(0.4, () => {
      go('end')
    })
  })


})
// init world


scene('end', () => {

  const isHighScore = co2Count > highScore


  add([
    pos(width() / 2, 150),
    text('Game over', {
      size: 45, // 48 pixels tall
      width: 700,
      font: 'apl386',
    }), 
    color(hsl2rgb(255, 1, 0)),
    origin('center')
  ])

  add([
    pos(width() / 2, 200),
    text('CO2 avoided:', {
      size: 25, // 48 pixels tall
      width: 700,
      font: 'apl386'
    }),
    color(hsl2rgb(255, 1, 0)),
    origin('center')
  ])

  add([
    pos(width() / 2, 250),
    text(co2Count, {
      size: 40, // 48 pixels tall
      width: 700,
      font: 'apl386'
    }),
    color(isHighScore ? rgb(244, 100, 50) : hsl2rgb(255, 1, 0)),
    origin('center')
  ])

  if (isHighScore) {
    add([
      pos(width() / 2, 300),
      text('New high score', {
        size: 40, // 48 pixels tall
        width: 700,
        font: 'apl386',
      }),
      color(rgb(244, 100, 50)),
      origin('center')
    ])
  }

  onKeyPress(() => {
    if (co2Count > highScore) highScore = co2Count
    co2Count = 0
    go('game')
  })


  onMousePress(() => {
    if (co2Count > highScore) highScore = co2Count
    co2Count = 0
    go('game')
  })

  const restartButton = add([
    pos(width() / 2, 400),
    text('Click here to restart', {
      size: 25, // 48 pixels tall
      width: 700,
      font: 'apl386'
    }),
    color(hsl2rgb(255, 1, 0)),
    origin('center')
  ])

})

go('game')