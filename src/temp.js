if(highScore < co2Count){
  add([
    pos(width() / 2, 500),
    text('New high score', {
      size: 40, // 48 pixels tall
      width: 700,
      font: 'apl386',
    }),
    color(rgb(244, 100, 50)),
    origin('center')
  ])
}