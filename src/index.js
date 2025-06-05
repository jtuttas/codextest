function FlappyBirdGame() {
  const canvasRef = React.useRef(null);
  const requestRef = React.useRef();
  const runningRef = React.useRef(false);
  const birdRef = React.useRef({ x: 80, y: 150, radius: 10, velocity: 0 });
  const pipesRef = React.useRef([]);
  const frameRef = React.useRef(0);
  const scoreRef = React.useRef(0);

  const [gameOver, setGameOver] = React.useState(false);
  const [, setRerender] = React.useState(0); // used to trigger rerender for score

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gravity = 0.5;
    const flapStrength = -8;
    const pipeWidth = 40;
    const gapHeight = 100;

    function addPipe() {
      const gapY = Math.random() * (canvas.height - gapHeight - 40) + 20;
      pipesRef.current.push({ x: canvas.width, gapY, scored: false });
    }

    function resetGame() {
      birdRef.current.y = canvas.height / 2;
      birdRef.current.velocity = 0;
      pipesRef.current = [];
      frameRef.current = 0;
      scoreRef.current = 0;
      setRerender(s => s + 1);
      setGameOver(false);
      runningRef.current = true;
      requestRef.current = requestAnimationFrame(update);
    }

    function flap() {
      if (!runningRef.current) {
        resetGame();
      } else {
        birdRef.current.velocity = flapStrength;
      }
    }

    function handleKeyDown(e) {
      if (e.code === 'Space') {
        e.preventDefault();
        flap();
      }
    }

    function hasCollision(pipe) {
      const b = birdRef.current;
      return (
        b.x + b.radius > pipe.x &&
        b.x - b.radius < pipe.x + pipeWidth &&
        (b.y - b.radius < pipe.gapY ||
          b.y + b.radius > pipe.gapY + gapHeight)
      );
    }

    function update() {
      const b = birdRef.current;
      b.velocity += gravity;
      b.y += b.velocity;

      if (frameRef.current % 90 === 0) addPipe();
      frameRef.current++;

      pipesRef.current.forEach(pipe => {
        pipe.x -= 2;
        if (!pipe.scored && pipe.x + pipeWidth < b.x) {
          pipe.scored = true;
          scoreRef.current += 1;
          setRerender(s => s + 1);
        }
      });

      pipesRef.current = pipesRef.current.filter(p => p.x + pipeWidth > 0);

      if (
        b.y + b.radius > canvas.height ||
        b.y - b.radius < 0 ||
        pipesRef.current.some(hasCollision)
      ) {
        runningRef.current = false;
        setGameOver(true);
        draw();
        return;
      }

      draw();
      if (runningRef.current) {
        requestRef.current = requestAnimationFrame(update);
      }
    }

    function draw() {
      const b = birdRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'green';
      pipesRef.current.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.gapY);
        ctx.fillRect(
          pipe.x,
          pipe.gapY + gapHeight,
          pipeWidth,
          canvas.height - pipe.gapY - gapHeight
        );
      });

      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${scoreRef.current}`, 10, 25);
    }

    draw();
    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('click', flap);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('click', flap);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={300}></canvas>
      {gameOver && <div>Game Over - Click or press space to restart</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FlappyBirdGame />);
