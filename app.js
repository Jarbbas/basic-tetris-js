document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10

  //The Tetrominoes
    const lTetromino = [
      [1, width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1],
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
      [1,width,width+1,width+2],
      [1,width+1,width+2,width*2+1],
      [width,width+1,width+2,width*2+1],
      [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1]
    ]

    const iTetromino = [
      [1,width+1,width*2+1,width*3+1],
      [width,width+1,width+2,width+3],
      [1,width+1,width*2+1,width*3+1],
      [width,width+1,width+2,width+3]
    ]

    const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino,iTetromino]

    //this random variable uses 2 math js embended methods
    //Math floor to round down to the near integer value and Math random to get random numbers
    // based on multiplication of the size of Array "theTetrominos" size
    let random = Math.floor(Math.random()*theTetrominos.length)
    console.log(random)


    let curentPostion = 4
    let curentRotation = 0

    let current = theTetrominos[random][curentRotation]
    console.log(current)

//this function draws tretomino
// uses the foreach array loop adding the css trough the "classList" method to each var "square"(divs)
    function draw () {
      current.forEach(index => {
        squares[curentPostion + index].classList.add('tetromino')
      })
    }

    //calls function to draw the tretomino
    draw()

    //same as draw but bt removing the css class it simulates an tetromino movement
    function undraw () {
      current.forEach(index => {
        squares[curentPostion + index].classList.remove('tetromino')
      })
    }

    //function that makes tetromino move down 1 second
    timerId = setInterval(moveDown, 1000)

    //moveDown function

    function moveDown () {
      undraw()
      curentPostion += width
      draw()
      freeze()
    }

    function freeze () {
      if (current.some(index => squares[curentPostion + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[curentPostion + index].classList.add('taken'))
        //start a new tretromino
         random = Math.floor(Math.random() * theTetrominos.length)
         current = theTetrominos[random][curentRotation]
         curentPostion = 4
         draw()
        }
      }

})
