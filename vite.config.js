import {defineConfig} from 'vite'
import {parse} from 'url'

const imageProxyPlugin = () => ({
    name: 'image-proxy',
    configureServer(server) {
        server.middlewares.use('/api/image-proxy', async (req, res) => {
            const {query} = parse(req.url, true)
            const imageUrl = query.url

            if (!imageUrl || typeof imageUrl !== 'string') {
                res.statusCode = 400
                return res.end('Query parameter "url" is required.')
            }

            try {
                const response = await fetch(imageUrl)

                if (!response.ok) {
                    res.statusCode = response.status
                    return res.end(response.statusText)
                }

                const contentType = response.headers.get('content-type')

                if (contentType) {
                    res.setHeader('Content-Type', contentType)
                }

                const imageBuffer = await response.arrayBuffer()

                res.end(Buffer.from(imageBuffer))
            } catch (error) {
                res.statusCode = 500
                return res.end('Internal proxy error.')
            }
        })
    }
})

export default defineConfig({
    plugins: [
        imageProxyPlugin()
    ],

    // Base path for production
    base: './',

    // Development server config
    server: {
        host: true,
        port: 5173,
        open: false
    },

    // Build optimizations
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three'],
                    'lil-gui': ['lil-gui']
                }
            }
        }
    },

    // Asset handling
    assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.mp3'],

    // Optimize dependencies
    optimizeDeps: {
        include: ['three', 'lil-gui']
    },

    // Public directory
    publicDir: 'public'
})
