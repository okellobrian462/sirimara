export function slugifyAgentName(firstName: string, lastName?: string | null) {
    const name = [firstName, lastName].filter(Boolean).join(' ');

    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

export function slugifyAgentFirstName(firstName: string) {
    return firstName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
