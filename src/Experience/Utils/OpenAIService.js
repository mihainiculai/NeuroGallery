import OpenAI from 'openai'

export default class OpenAIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        })
    }

    async generateImage(prompt) {
        const response = await this.openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            style: "vivid"
        })

        return response.data[0].url
    }

    getProxiedImageUrl(originalUrl) {
        return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`
    }
} 