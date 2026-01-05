import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Middleware pour vérifier l'API Key
 * Vérifie le header X-API-Key dans la requête
 * 
 * @returns true si l'API Key est valide, false sinon (et envoie la réponse d'erreur)
 */
export function verifyApiKey(req: VercelRequest, res: VercelResponse): boolean {
    try {
        // Récupérer l'API Key depuis le header (case-insensitive)
        // Vercel normalise les headers en minuscules
        const apiKey = req.headers['x-api-key'] as string | undefined;
        const expectedApiKey = process.env.ADMIN_API_KEY;

        // Vérifier si ADMIN_API_KEY est configuré
        if (!expectedApiKey) {
            console.error('ADMIN_API_KEY not configured in environment variables');
            res.status(500).json({
                error: 'Server configuration error',
                message: 'API key authentication is not configured'
            });
            return false;
        }

        // Vérifier si l'API Key est présente dans la requête
        if (!apiKey) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Missing API key. Include X-API-Key header in your request.'
            });
            return false;
        }

        // Vérifier si l'API Key correspond
        if (apiKey !== expectedApiKey) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid API key'
            });
            return false;
        }

        // API Key valide
        return true;
    } catch (error: any) {
        console.error('Error in verifyApiKey:', error);
        // En cas d'erreur, retourner une erreur 500
        if (!res.headersSent) {
            res.status(500).json({
                error: 'Internal server error',
                message: 'Error verifying API key'
            });
        }
        return false;
    }
}

