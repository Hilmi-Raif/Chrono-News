import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
    'address',
    'article',
    'aside',
    'b',
    'blockquote',
    'br',
    'caption',
    'code',
    'dd',
    'del',
    'div',
    'dl',
    'dt',
    'em',
    'figcaption',
    'figure',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'i',
    'img',
    'ins',
    'li',
    'ol',
    'p',
    'pre',
    's',
    'section',
    'span',
    'strong',
    'sub',
    'sup',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
    'u',
    'ul',
    'a',
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
    a: ['href', 'name', 'target', 'rel', 'class', 'style'],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class', 'style'],
    '*': ['class', 'style', 'title', 'align'],
};

const ALLOWED_STYLES: sanitizeHtml.IOptions['allowedStyles'] = {
    '*': {
        color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/, /^rgba\(/, /^[a-z]+$/i],
        'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/, /^rgba\(/, /^[a-z]+$/i],
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        'font-weight': [/^\d+$/, /^bold$/, /^normal$/],
        'font-style': [/^italic$/, /^normal$/],
        'text-decoration': [/^none$/, /^underline$/, /^line-through$/],
        width: [/^\d+(\.\d+)?(px|%|em|rem|vw)$/],
        height: [/^\d+(\.\d+)?(px|%|em|rem|vh)$/],
        'max-width': [/^\d+(\.\d+)?(px|%|em|rem|vw)$/],
    },
};

export const sanitizeHtmlContent = (content: string): string => {
    if (!content) return '';

    return sanitizeHtml(content, {
        allowedTags: ALLOWED_TAGS,
        allowedAttributes: ALLOWED_ATTRIBUTES,
        allowedStyles: ALLOWED_STYLES,
        allowedSchemes: ['http', 'https', 'mailto', 'tel', 'data'],
        allowedSchemesByTag: {
            img: ['http', 'https', 'data'],
        },
        allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
        allowProtocolRelative: false,
        transformTags: {
            a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
        },
    });
};
