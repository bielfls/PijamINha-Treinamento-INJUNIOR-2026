
export function formatSize(size: string): number {
    switch (size) {
        case "PP":
            return 0;
        case "P":
            return 1;
        case "M":
            return 2;
        case "G":
            return 3;
        case "GG":
            return 4;
        default:
            return -1; // Tamanho desconhecido
    }
}