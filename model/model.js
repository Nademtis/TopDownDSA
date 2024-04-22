class coord {
    constructor(row, col) {
        this.row = row
        this.col = col
    }
}
export default class Model {

    constructor() {

        this.player = {
            x: 75,
            y: 75,
            regX: 10,
            regY: 24,
            hitbox: {
                x: 7,
                y: 15,
                w: 10,
                h: 10
            },
            speed: 140,
            isMoving: false,
            direction: undefined
        }

        this.tiles = [
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 5, 5, 0],
            [0, 0, 0, 2, 3, 3, 2, 0, 1, 0, 0, 0, 5, 5, 5, 0],
            [0, 0, 0, 2, 3, 3, 2, 0, 1, 0, 0, 0, 5, 5, 5, 0],
            [0, 0, 0, 2, 2, 2, 2, 0, 1, 0, 0, 0, 5, 5, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 5, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 5, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]]
        this.items = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]]
        this.GRID_WIDTH = this.tiles[0].length
        this.GRID_HEIGHT = this.tiles.length
        this.TILE_SIZE = 32
    }
    getTileAtAtCoord({ row, col }) {
        return this.tiles[row][col]
    }
    getCoordFromPos({ x, y }) {
        const row = Math.floor(y / this.TILE_SIZE)
        const col = Math.floor(x / this.TILE_SIZE)

        const coord = { row, col }
        return coord
    }
    getTilesUnderPlayer(newPos = { x: this.player.x, y: this.player.y }) {
        const tileCoords = []
        const topLeft = {
            x: newPos.x - this.player.regX + this.player.hitbox.x,
            y: newPos.y - this.player.regY + this.player.hitbox.y
        }
        const topRight = { x: topLeft.x + this.player.hitbox.w, y: topLeft.y }
        const bottomLeft = { x: topLeft.x, y: topLeft.y + this.player.hitbox.h };
        const bottomRight = { x: topRight.x, y: bottomLeft.y };


        const topLeftCoords = this.getCoordFromPos(topLeft)
        const topRightCoords = this.getCoordFromPos(topRight)
        const bottomLeftCoords = this.getCoordFromPos(bottomLeft);
        const bottomRightCoords = this.getCoordFromPos(bottomRight);

        tileCoords.push(topLeftCoords)
        tileCoords.push(topRightCoords)
        tileCoords.push(bottomLeftCoords);
        tileCoords.push(bottomRightCoords);

        return tileCoords

    }

}

