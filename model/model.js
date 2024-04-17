class coord {
    constructor(row, col) {
        this.row = row
        this.col = col
    }
}
export default class Model {

    constructor() {

        this.player = {
            x: 5,
            y: 5,
            regX: 10,
            regY: 24,
            hitbox: { //TODO random values, might need fixing
                x: 4,
                y: 7,
                w: 12,
                h: 17
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

}

