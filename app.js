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

    const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    //this random variable uses 2 math js embended methods
    //Math floor to round down to the near integer value and Math random to get random numbers
    // based on multiplication of the size of Array "theTetrominos" size
    let random = Math.floor(Math.random() * theTetrominos.length)
    console.log('tetrominos length array' + ' ' + theTetrominos.length)
    console.log('random' + ' ' + random)

    let currentPosition = 4
    let currentRotation = 0

    let current = theTetrominos[random][currentRotation]
    console.log('current' + ' ' + current)

//this function draws tretomino
// uses the foreach array loop adding the css trough the "classList" method to each var "square"(divs)
    function draw () {
      current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
      })
    }

    //same as draw but bt removing the css class it simulates an tetromino movement
    function undraw () {
      current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
      })
    }

    //function that makes tetromino move down 1 second
    timerId = setInterval(moveDown, 1000)

    function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }
    document.addEventListener('keyup', control)

    //moveDown function
    function moveDown () {
      undraw()
      currentPosition += width
      draw()
      freeze()
    }

    // freeze function
    function freeze () {
      //The some() method tests whether at least one element in the array "curent" returns true if the div right below has the class of taken
      //if true adds the class taken and starts a new tetromino from the top in using random value to mix things ups it's an extra
      if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
          current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new tretromino
         random = Math.floor(Math.random() * theTetrominos.length)
         current = theTetrominos[random][currentRotation]
         currentPosition = random
         draw()
        }
      }

      //functions to move tetrominos to the left & right side of the screen
      //unlesh is at the edge or there is a blocker
      function moveLeft () {
        undraw()
        /*isAtLeftEdge will use some() method to validate it bolean value, if the currentPosition plus its index value of
        his modulus operation results in zero, means it has reach the left side of div collection
        because we */
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) {
            currentPosition -=1
        }
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }
        draw()
      }

      function moveRight () {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

        if (!isAtRightEdge) {
          currentPosition +=1
        }
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
        draw()
      }

      function rotate () {
        undraw()
        currentRotation++
        //if the current rotation get to 4, currentRotation goes all the way back to zero
        if (currentRotation === current.length) {
          currentRotation = 0
        }
        current = theTetrominos[random][currentRotation]
        draw()
      }

})
