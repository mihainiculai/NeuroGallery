import Experience from '../Experience.js'
import Environment from './Environment.js'
import GalleryRoom from './GalleryRoom.js'
import Paintings from './Paintings.js'
import Benches from './Benches.js'
import Particles from './Particles.js'
import Easel from './Easel.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    setup() {
        // Create world objects
        this.environment = new Environment()
        this.galleryRoom = new GalleryRoom()
        this.paintings = new Paintings()
        this.benches = new Benches()
        this.particles = new Particles()
        this.easel = new Easel()

        if (this.environment && this.paintings) {
            this.environment.setPaintings(this.paintings)
        }
    }

    update() {
        if (this.particles) {
            this.particles.update()
        }

        if (this.environment) {
            this.environment.update()
        }
    }
} 