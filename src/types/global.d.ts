declare global {
    interface Window {
        voirClient: (clientId: string) => void;
        closeClientModal: () => void;
    }
}

export {};