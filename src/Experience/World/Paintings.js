import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Paintings {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.paintingMeshes = []
        this.paintingData = []
        this.spotlights = []

        this.loadPaintingData()
    }

    async loadPaintingData() {
        const response = await fetch('/textures/paintings/painting_data.json')
        this.paintingData = await response.json()
        this.createPaintingsFromData()
    }

    createPaintingsFromData() {
        const positions = [
            // Back wall
            [-6, 3.5, -11.8],
            [0, 3.5, -11.8],
            [6, 3.5, -11.8],

            // Front wall
            [-6, 3.5, 11.8],
            [0, 3.5, 11.8],
            [6, 3.5, 11.8],
        ]

        this.paintingData.slice(0, positions.length).forEach((painting, index) => {
            this.createPainting(painting, positions[index])
        })
    }

    createPainting(paintingData, position) {
        const group = new THREE.Group()

        const canvasGeometry = new THREE.PlaneGeometry(3.5, 2.2)

        const canvasMaterial = new THREE.MeshStandardMaterial({
            color: this.getColorFromTitle(paintingData.title),
            roughness: 0.9,
            metalness: 0.0,
            transparent: false,
            side: THREE.FrontSide,
            envMapIntensity: 0.1,
        })

        const textureLoader = new THREE.TextureLoader()
        textureLoader.load(
            `/${paintingData.imageFile}`,
            (texture) => {
                canvasMaterial.map = texture
                canvasMaterial.needsUpdate = true
                canvasMaterial.color.setHex(0xffffff)
            },
            undefined,
            (error) => {}
        )

        const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial)
        canvas.position.z = 0.065
        canvas.userData.painting = paintingData
        canvas.name = `painting-${paintingData.title?.replace(/\s+/g, '-') || 'untitled'}`

        group.add(canvas)

        // Add spotlight for this painting
        const spotLight = new THREE.SpotLight(0xffffff, 80, 10, Math.PI * 0.23, 0.3, 2)
        spotLight.position.set(0, 3.7, 2)
        spotLight.target = canvas
        spotLight.visible = false
        spotLight.castShadow = true
        spotLight.shadow.mapSize.set(1024, 1024)
        spotLight.shadow.camera.near = 1
        spotLight.shadow.camera.far = 8
        spotLight.shadow.bias = -0.001

        group.add(spotLight)
        this.spotlights.push(spotLight)

        if (this.resources.items.pictureFrame) {
            const frameModel = this.resources.items.pictureFrame.scene.clone()

            frameModel.scale.set(3.0, 2.5, 2.5)
            frameModel.position.set(0, 3.15, 0)
            frameModel.rotation.x = Math.PI / 2
            frameModel.rotation.y = Math.PI / 2
            frameModel.rotation.z = Math.PI / 2

            frameModel.traverse((child) => {
                if (child.isMesh) {
                    child.receiveShadow = true
                    child.castShadow = true
                }
            })

            group.add(frameModel)
        }

        group.position.set(...position)

        // Rotate front wall paintings to face inward
        if (position[2] > 0) {
            group.rotation.y = Math.PI
        }

        this.scene.add(group)
        this.paintingMeshes.push(canvas)
    }

    setSpotlightsVisible(visible) {
        this.spotlights.forEach(light => {
            light.visible = visible
        })
    }

    getColorFromTitle(title) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f39c12', '#9b59b6', '#2ecc71', '#e74c3c', '#f1c40f']
        const hash = title.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0)
            return a & a
        }, 0)
        return colors[Math.abs(hash) % colors.length]
    }
} 