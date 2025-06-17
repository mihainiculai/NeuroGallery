import './style.css'
import Experience from './Experience/Experience.js'

// Initialize the Experience
const experience = new Experience(document.querySelector('canvas.webgl'))

// Keyboard shortcuts for GUI and other controls
document.addEventListener('keydown', (event) => {
    // Only handle shortcuts when not in an input field
    if (event.target.tagName.toLowerCase() === 'input') return
    
    // Don't interfere with camera controls when locked
    if (experience.camera?.controls?.isLocked) {
        switch (event.code) {
            case 'KeyG':
                event.preventDefault()
                if (experience.debug) {
                    experience.debug.toggle()
                }
                break
                
            case 'KeyR':
                event.preventDefault()
                if (experience.camera) {
                    experience.camera.instance.position.set(0, 1.6, 5)
                }
                break
                
            case 'KeyF':
                event.preventDefault()
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen()
                        .catch(err => console.warn('Could not enter fullscreen:', err))
                } else {
                    document.exitFullscreen()
                        .catch(err => console.warn('Could not exit fullscreen:', err))
                }
                break
                
            case 'Digit1':
                event.preventDefault()
                if (experience.camera) {
                    experience.camera.instance.position.set(0, 1.6, 5)
                }
                break
                
            case 'Digit2':
                event.preventDefault()
                if (experience.camera) {
                    experience.camera.instance.position.set(0, 1.6, 0)
                }
                break
                
            case 'Digit3':
                event.preventDefault()
                if (experience.camera) {
                    experience.camera.instance.position.set(-8, 1.6, -8)
                }
                break
                
            case 'Digit4':
                event.preventDefault()
                if (experience.camera) {
                    experience.camera.instance.position.set(0, 8, 8)
                }
                break
        }
    } else {
        switch (event.code) {
            case 'KeyG':
                event.preventDefault()
                if (experience.debug) {
                    experience.debug.toggle()
                }
                break
        }
    }
})

// GUI Toggle Button functionality
document.addEventListener('DOMContentLoaded', () => {
    const guiToggleBtn = document.getElementById('guiToggleBtn')
    
    if (guiToggleBtn) {
        // Set initial state
        updateToggleButton()
        
        // Add click handler
        guiToggleBtn.addEventListener('click', () => {
            if (experience.debug) {
                experience.debug.toggle()
                updateToggleButton()
            }
        })
        
        // Update button appearance based on GUI state
        function updateToggleButton() {
            if (experience.debug?.visible) {
                guiToggleBtn.classList.remove('pulse')
                guiToggleBtn.title = 'Hide Controls Panel (G)'
            } else {
                guiToggleBtn.classList.add('pulse')
                guiToggleBtn.title = 'Show Controls Panel (G)'
            }
        }
        
        // Update button state when GUI is toggled via keyboard
        setInterval(updateToggleButton, 500)
    }
})
