let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let textureCobble = new Image();
textureCobble.src = "Textures/cobble.png";

let objects = [];

class Structure {
  pos = {
    x: 0,
    y: 0,
  };
  health = 1000;
  constructor(x, y, height, width, texture) {
    this.pos.x = x;
    this.pos.y = y;
    this.width = width;
    this.height = height;
    this.texture = texture;
    objects.push(this);
  }
  show() {
    ctx.beginPath();
    ctx.rect(
      this.pos.x - this.width / 2,
      this.pos.y - this.height / 2,
      this.width,
      this.height
    );

    if (typeof this.texture === "string") {
      ctx.fillStyle = this.texture;
      ctx.fillRect(
        this.pos.x - this.width / 2,
        this.pos.y - this.height / 2,
        this.width,
        this.height
      );
    } else {
      var pattern = ctx.createPattern(this.texture, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(
        this.pos.x - this.width / 2,
        this.pos.y - this.height / 2,
        this.width,
        this.height
      );
    }
  }
}

let gameMap = [
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3],
];

let gridSize = canvas.width / gameMap.length;

startPos = {
  x: 0,
  y: 0,
};
endPos = {
  x: 0,
  y: 0,
};

function drawMap(gameMap) {
  for (let j = 0; j < gameMap.length; j++) {
    for (let i = 0; i < gameMap[0].length; i++) {
      if (gameMap[j][i] === 1) {
        new Structure(
          (canvas.width / gameMap.length) * j +
            canvas.width / gameMap.length / 2,
          (canvas.height / gameMap[0].length) * i +
            canvas.width / gameMap[0].length / 2,
          canvas.width / gameMap.length,
          canvas.height / gameMap[0].length,
          textureCobble
        );
      }
      if (gameMap[j][i] === 2) {
        startPos.x = j;
        startPos.y = i;
        new Structure(
          (canvas.width / gameMap.length) * j +
            canvas.width / gameMap.length / 2,
          (canvas.height / gameMap[0].length) * i +
            canvas.width / gameMap[0].length / 2,
          canvas.width / gameMap.length,
          canvas.height / gameMap[0].length,
          "red"
        );
      }
      if (gameMap[j][i] === 3) {
        endPos.x = j;
        endPos.y = i;
        new Structure(
          (canvas.width / gameMap.length) * j +
            canvas.width / gameMap.length / 2,
          (canvas.height / gameMap[0].length) * i +
            canvas.width / gameMap[0].length / 2,
          canvas.width / gameMap.length,
          canvas.height / gameMap[0].length,
          "blue"
        );
      }
    }
  }
}
drawMap(gameMap);

function drawPixel(posX, posY, color) {
  new Structure(
    (canvas.width / gameMap.length) * posX + canvas.width / gameMap.length / 2,
    (canvas.height / gameMap[0].length) * posY +
      canvas.width / gameMap[0].length / 2,
    canvas.width / gameMap.length,
    canvas.height / gameMap[0].length,
    color
  );
}

function doesInclude(parent, x, y) {
  if (parent.length === 0) {
    return false;
  }
  for (let i = 0; i < parent.length; i++) {
    const element = parent[i];
    if (element.x == x && element.y == y) {
      return true;
    }
  }
  return false;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let waitTime = 50;

let iterationsMax = 60;
async function pathFind(start, goal) {
  class positionClass {
    constructor(x, y, historyInput) {
      this.x = x;
      this.y = y;
      this.history = [];
      this.history.push({ x: x, y: y });
      historyInput.forEach((Object) => {
        this.history.push(Object);
      });
    }
  }
  start = new positionClass(start.x, start.y, []);
  let branches = [];
  let searchedSpots = [];
  let nextIteration = [start];
  let iterations = 0;
  let found = false;
  let returnvar = [];
  {
    while (found === false) {
      await sleep(waitTime);
      if (iterations > iterationsMax) {
        console.log("No solution");
        return;
      }
      nextIteration.forEach((Object) => {
        branches.push(Object);
      });
      nextIteration = [];

      let len = branches.length;

      for (let i = 0; i < len; i++) {
        const branch = branches[i];
        console.log(branch);
        try {
          if (doesInclude(searchedSpots, branch.x, branch.y - 1) === false) {
            if (gameMap[branch.x][branch.y - 1] === 3) {
              found = true;

              for (let index = 0; index < branch.history.length; index++) {
                await sleep(waitTime);
                const Object = branch.history[index];
                {
                  returnvar.push({
                    x: Object.x * gridSize + gridSize / 2,
                    y: Object.y * gridSize + gridSize / 2,
                  });
                  drawPixel(Object.x, Object.y, "purple");
                }
              }

              return returnvar;
            } else if (gameMap[branch.x][branch.y - 1] === 0) {
              searchedSpots.push(
                new positionClass(branch.x, branch.y - 1, branch.history)
              );
              nextIteration.push(
                new positionClass(branch.x, branch.y - 1, branch.history)
              );
              drawPixel(branch.x, branch.y - 1, "yellow");
            }
          }
        } catch {}
        try {
          if (doesInclude(searchedSpots, branch.x + 1, branch.y) === false) {
            if (gameMap[branch.x + 1][branch.y] === 3) {
              found = true;
              for (let index = 0; index < branch.history.length; index++) {
                await sleep(waitTime);
                const Object = branch.history[index];
                {
                  returnvar.push({
                    x: Object.x * gridSize + gridSize / 2,
                    y: Object.y * gridSize + gridSize / 2,
                  });
                  drawPixel(Object.x, Object.y, "purple");
                }
              }
              return returnvar;
            } else if (gameMap[branch.x + 1][branch.y] === 0) {
              searchedSpots.push(
                new positionClass(branch.x + 1, branch.y, branch.history)
              );
              nextIteration.push(
                new positionClass(branch.x + 1, branch.y, branch.history)
              );
              drawPixel(branch.x + 1, branch.y, "yellow");
            }
          }
        } catch {}
        try {
          if (doesInclude(searchedSpots, branch.x, branch.y + 1) === false) {
            if (gameMap[branch.x][branch.y + 1] === 3) {
              found = true;
              for (let index = 0; index < branch.history.length; index++) {
                await sleep(waitTime);
                const Object = branch.history[index];
                {
                  returnvar.push({
                    x: Object.x * gridSize + gridSize / 2,
                    y: Object.y * gridSize + gridSize / 2,
                  });
                  drawPixel(Object.x, Object.y, "purple");
                }
              }
              return returnvar;
            } else if (gameMap[branch.x][branch.y + 1] === 0) {
              searchedSpots.push(
                new positionClass(branch.x, branch.y + 1, branch.history)
              );
              nextIteration.push(
                new positionClass(branch.x, branch.y + 1, branch.history)
              );
              drawPixel(branch.x, branch.y + 1, "yellow");
            }
          }
        } catch {}
        try {
          if (doesInclude(searchedSpots, branch.x - 1, branch.y) === false) {
            if (gameMap[branch.x - 1][branch.y] === 3) {
              found = true;
              for (let index = 0; index < branch.history.length; index++) {
                await sleep(waitTime);
                const Object = branch.history[index];
                {
                  returnvar.push({
                    x: Object.x * gridSize + gridSize / 2,
                    y: Object.y * gridSize + gridSize / 2,
                  });
                  drawPixel(Object.x, Object.y, "purple");
                }
              }
              return returnvar;
            } else if (gameMap[branch.x - 1][branch.y] === 0) {
              searchedSpots.push(
                new positionClass(branch.x - 1, branch.y, branch.history)
              );
              nextIteration.push(
                new positionClass(branch.x - 1, branch.y, branch.history)
              );
              drawPixel(branch.x - 1, branch.y, "yellow");
            }
          }
        } catch {}
      }
      iterations++;
      branches = [];
    }
  }
}
let lines = [];
class Line {
  startPos = {
    x: 0,
    y: 0,
  };
  endPos = {
    x: 0,
    y: 0,
  };
  constructor(x, y, x2, y2) {
    this.startPos.x = x;
    this.startPos.y = y;
    this.endPos.x = x2;
    this.endPos.y = y2;
    lines.push(this);
  }
  show() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.startPos.x, this.startPos.y);
    ctx.lineTo(this.endPos.x, this.endPos.y);
    ctx.stroke();
  }
}
let linePoints = pathFind(startPos, endPos);
console.log(linePoints[1], linePoints[2]);

new Line(linePoints[1], linePoints[2]);
for (let i = 0; i < linePoints.length; i++) {
  if (i < linePoints.length - 1) {
    new Line(
      linePoints[i].x,
      linePoints[i].y,
      linePoints[i + 1].x,
      linePoints[i + 1].y
    );
  }
}

function update() {
  requestAnimationFrame(update);
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
  objects.forEach((Object) => {
    if (Object.health > 0) {
      Object.show();
    } else {
      objects.splice(objects.indexOf(Object), 1);
    }
  });
  lines.forEach((Object) => {
    {
      Object.show();
    }
  });
}
update();
