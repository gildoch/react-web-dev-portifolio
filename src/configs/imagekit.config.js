// ImageKit Configuration
export const imageKitConfig = {
    publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT,
    authenticator: async () => {
        try {
            const response = await fetch(`${window.location.origin}/auth`);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    },
};
