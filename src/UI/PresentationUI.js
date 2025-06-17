export default class PresentationUI {
    constructor() {
        this.createUI()
        this.animationId = null
    }

    createUI() {
        // Create main container
        this.container = document.createElement('div')
        this.container.className = 'presentation-overlay'
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            display: none;
            z-index: 10000;
            pointer-events: auto;
        `

        // Create content panel
        this.panel = document.createElement('div')
        this.panel.className = 'presentation-panel'
        this.panel.style.cssText = `
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.96), rgba(118, 75, 162, 0.96));
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 20px 30px;
            max-width: 650px;
            width: 90%;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(15px);
        `

        // Title
        this.title = document.createElement('h2')
        this.title.className = 'presentation-title'
        this.title.style.cssText = `
            margin: 0 0 10px 0;
            font-size: 2.2em;
            font-weight: 300;
            color: #ffffff;
            text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
            letter-spacing: 1.5px;
        `

        // AI Model info
        this.aiModel = document.createElement('div')
        this.aiModel.className = 'presentation-ai-model'
        this.aiModel.style.cssText = `
            margin: 0 0 15px 0;
            font-size: 1em;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            padding-bottom: 10px;
        `

        // Prompt
        this.prompt = document.createElement('div')
        this.prompt.className = 'presentation-prompt'
        this.prompt.style.cssText = `
            margin: 15px 0 0 0;
            font-size: 1em;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.95);
            font-style: italic;
            padding: 18px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            border-left: 3px solid rgba(255, 255, 255, 0.5);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) inset;
        `

        // Add a subtle animated border effect
        const promptBorder = document.createElement('div')
        promptBorder.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
            animation: borderPulse 3s ease-in-out infinite alternate;
        `
        this.prompt.appendChild(promptBorder)

        // Instructions
        this.instructions = document.createElement('div')
        this.instructions.className = 'presentation-instructions'
        this.instructions.style.cssText = `
            position: absolute;
            top: 30px;
            right: 30px;
            background: rgba(0, 0, 0, 0.6);
            padding: 12px 18px;
            border-radius: 15px;
            font-size: 0.85em;
            color: rgba(255, 255, 255, 0.9);
            opacity: 0;
            animation: fadeInOut 4s ease-in-out infinite;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        `
        this.instructions.innerHTML = 'Mișcă-te cu <strong style="color: #ffffff;">WASD</strong> sau apasă <strong style="color: #ffffff;">ESC</strong> pentru a ieși'

        // Add CSS animation
        const style = document.createElement('style')
        style.textContent = `
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; }
                50% { opacity: 1; }
            }
            
            @keyframes gentle-float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }
            
            @keyframes borderPulse {
                0% { opacity: 0.3; transform: translateX(-100%); }
                100% { opacity: 0.8; transform: translateX(100%); }
            }
            
            .presentation-panel.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            
            .presentation-title {
                animation: gentle-float 3s ease-in-out infinite;
            }
        `
        document.head.appendChild(style)

        // Assemble UI
        this.panel.appendChild(this.title)
        this.panel.appendChild(this.aiModel)
        this.panel.appendChild(this.prompt)
        this.container.appendChild(this.panel)
        this.container.appendChild(this.instructions)

        document.body.appendChild(this.container)
    }

    show(paintingData) {
        // Update content
        this.title.textContent = paintingData.title || 'Untitled Artwork'
        this.aiModel.textContent = `Created with ${paintingData.aiModel || 'AI Generator'}`
        this.prompt.textContent = `"${paintingData.prompt || 'No prompt available'}"`

        // Force show container immediately
        this.container.style.display = 'block'
        this.container.style.opacity = '1'
        this.container.style.zIndex = '10000'

        // Force show panel immediately
        this.panel.style.opacity = '1'
        this.panel.style.transform = 'translateX(-50%) translateY(0)'
        this.panel.classList.add('show')

        // Start text animation
        this.startTextAnimation()
    }

    hide() {
        // Stop text animation
        this.stopTextAnimation()

        // Animate out
        this.panel.classList.remove('show')
        this.panel.style.opacity = '0'
        this.panel.style.transform = 'translateX(-50%) translateY(100px)'

        // Hide container after animation
        setTimeout(() => {
            this.container.style.display = 'none'
            this.container.style.opacity = '0'
        }, 800)
    }

    startTextAnimation() {
        // Add subtle text breathing effect
        let phase = 0
        this.animationId = setInterval(() => {
            phase += 0.02
            this.prompt.style.opacity = 0.8 + Math.sin(phase) * 0.2
        }, 50)
    }

    stopTextAnimation() {
        if (this.animationId) {
            clearInterval(this.animationId)
            this.animationId = null
        }
        this.prompt.style.opacity = '1'
    }

    destroy() {
        this.stopTextAnimation()
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container)
        }
    }
} 