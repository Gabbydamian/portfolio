/**
 * Fixes markdown code blocks that don't have a language specified
 * by adding a default language (plaintext)
 * 
 * This prevents MDX editor parsing errors when loading existing content
 * with code blocks like ``` instead of ```javascript
 */
export function normalizeCodeBlocks(markdown: string): string {
    if (!markdown) return markdown;

    // Replace code blocks without language specifier
    // Pattern: ``` followed by newline (not a word character)
    // Replace with: ```plaintext
    const normalized = markdown.replace(/```(\s*\n)/g, '```plaintext$1');

    return normalized;
}

/**
 * Validates and fixes common markdown issues before passing to MDX editor
 */
export function prepareMarkdownForEditor(markdown: string): string {
    if (!markdown) return markdown;

    let prepared = markdown;

    // Fix code blocks without language
    prepared = normalizeCodeBlocks(prepared);

    // Add more normalizations here as needed

    return prepared;
}
