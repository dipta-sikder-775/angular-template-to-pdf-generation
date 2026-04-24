import jsPDF from 'jspdf';

declare global {
  interface Window {
    html2canvas: typeof import('html2canvas').default;
  }

  type TJsPDFsConfigOptions = import('jspdf').jsPDFOptions;
  type TJsPDFsHTMLOptions = import('jspdf').HTMLOptions;
}

const defaultJsPDFConfig: TJsPDFsConfigOptions = {
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
  putOnlyUsedFonts: true,
  floatPrecision: 16, // High precision for text alignment,
  compress: true, // Enable compression for smaller file size
};

const defaultHtmlOptionConfig: TJsPDFsHTMLOptions = {
  windowWidth: undefined, // Use original element width for calculation
  width: 210, // Target width to scale content
  autoPaging: 'text', // Smart paging to avoid clipping text lines
  html2canvas: {
    scale: 0.2645833333, // Convert px to mm (roughly)
    useCORS: true,
    logging: false,
    letterRendering: true,
    allowTaint: true,
  },
  margin: [10, 0, 10, 0],
  y: -7,
};

/**
 * This function determines whether the provided `src` value is a DOM element (`HTMLElement`).
 *
 * This function acts as a TypeScript type guard (type predicate), narrowing the input type to
 * `HTMLElement` when it returns `true`.
 *
 * @param src - The source value to validate.
 * @returns `true` if `src` is a non-null object representing an `HTMLElement`; otherwise `false`.
 */
function isSrcElement(src: TGenerateHtmlToPDFProps['src']): src is HTMLElement {
  return typeof src === 'object' && src !== null && 'offsetWidth' in src;
}

/* Function to get the window width for HTML rendering */
/**
 * Derives the PDF rendering `windowWidth` value from a supported `src` input.
 *
 * - If `src` is a DOM element, its `offsetWidth` is returned.
 * - If `src` is a string, the function attempts to convert it to a number.
 * - If conversion fails or `src` is neither an element nor a string, `undefined` is returned.
 *
 * @param src - Source input used for HTML-to-PDF generation (element or width-like string).
 * @returns The resolved window width as a number, or `undefined` when it cannot be determined.
 */
function getWindowWidth(
  src: TGenerateHtmlToPDFProps['src'],
): TJsPDFsHTMLOptions['windowWidth'] {
  if (isSrcElement(src)) {
    return src.offsetWidth;
  }

  if (typeof src !== 'string') {
    return;
  }

  const convertedNumberWindowWidth = Number(src);
  if (Number.isNaN(convertedNumberWindowWidth)) {
    return;
  }
  return convertedNumberWindowWidth;
}

type TGenerateHtmlToPDFProps = {
  src: string | HTMLElement;
  fileName?: string;
  configureFormat?: TJsPDFsConfigOptions;
  configureHtmlOption?: TJsPDFsHTMLOptions;
  uniqueFileName?: boolean;
};

export default async function generateHtmlToPDF({
  src,
  fileName = 'generated_portable_document_format.pdf',
  configureFormat,
  configureHtmlOption,
  uniqueFileName,
}: TGenerateHtmlToPDFProps) {
  const html2canvas = (await import('html2canvas')).default;
  const jsPDF = (await import('jspdf')).default;
  window.html2canvas = html2canvas; // Make html2canvas globally available for jsPDF's html method, without this, jsPDF's html method fails to generate PDF correctly

  const jsPDFInstance = new jsPDF({
    ...defaultJsPDFConfig,
    ...configureFormat,
  });
  await jsPDFInstance.html(src, {
    callback: (pdf) => {
      pdf.save(uniqueFileName ? `${fileName || ''}-${Date.now()}` : fileName);
    },
    ...defaultHtmlOptionConfig,
    ...(configureHtmlOption ?? {}),
    windowWidth: configureHtmlOption?.windowWidth ?? getWindowWidth(src), // Use original element width for calculation
  });
}

type FooterTextConfig = {
  text: string | ((currentPage: number, totalPages: number) => string);
  align: 'left' | 'center' | 'right';
  fontStyle?: 'normal' | 'italic' | 'bold' | 'bolditalic';
  fontSize?: number;
  colorRGB?: [number, number, number]; // RGB
  showOn?:
    | 'all'
    | 'first'
    | 'last'
    | 'none'
    | 'even'
    | 'odd'
    | number[]
    | ((currentPage: number, totalPages: number) => boolean);
};

type TConfigureFooterOptions = {
  margin?: number;
  yOffset?: number;
};

/**
 * Renders configurable footer text on each page of a jsPDF document.
 *
 * This utility iterates through all pages in the provided PDF instance and
 * conditionally renders one or more footer entries based on each entry's
 * `showOn` rule. It supports static or dynamic text, per-entry alignment,
 * font styling, font sizing, and RGB text color.
 *
 * @param pdf - The jsPDF instance to modify.
 * @param data - Footer configuration entries describing what to render and when to render it.
 * @param config - Global footer layout options.
 * @param config.margin - Horizontal margin used for left/right aligned footer content. Defaults to `10`.
 * @param config.yOffset - Distance from the bottom edge of the page used to compute footer Y position. Defaults to `5`.
 *
 * @returns Metadata describing the rendering context after footer generation.
 * @returns.totalPages - Total number of pages processed.
 * @returns.pageWidth - Width of the PDF page.
 * @returns.pageHeight - Height of the PDF page.
 * @returns.calculatedMargin - Effective margin used during rendering.
 * @returns.calculatedY - Effective Y coordinate used for footer text.
 */
export function generatePDFFooter(
  pdf: jsPDF, // Use jsPDF type if available in your scope
  data: FooterTextConfig[],
  config: TConfigureFooterOptions = {
    margin: 10,
    yOffset: 5,
  },
) {
  const totalPages = pdf.getNumberOfPages();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = config.margin ?? 10;
  const y = pageHeight - (config.yOffset ?? 5);

  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);

    data.forEach((cfg) => {
      // 1. Resolve 'showOn' logic
      let show = false;
      const { showOn } = cfg;

      if (typeof showOn === 'function') {
        show = showOn(i, totalPages);
      } else if (Array.isArray(showOn)) {
        show = showOn.includes(i);
      } else {
        switch (showOn) {
          case 'all':
            show = true;
            break;
          case 'first':
            show = i === 1;
            break;
          case 'last':
            show = i === totalPages;
            break;
          case 'even':
            show = i % 2 === 0;
            break;
          case 'odd':
            show = i % 2 !== 0;
            break;
          case 'none':
            show = false;
            break;
          default:
            show = true; // Default to all if not specified
        }
      }

      if (!show) return;

      // 2. Resolve dynamic text
      const content =
        typeof cfg.text === 'function' ? cfg.text(i, totalPages) : cfg.text;

      // 3. Set Styles
      pdf.setFont('helvetica', cfg.fontStyle || 'normal');
      pdf.setFontSize(cfg.fontSize || 10);

      const [r, g, b] = cfg.colorRGB || [100, 100, 100];
      pdf.setTextColor(r, g, b);

      // 4. Calculate X position based on alignment
      let x = margin;
      if (cfg.align === 'right') x = pageWidth - margin;
      if (cfg.align === 'center') x = pageWidth / 2;

      pdf.text(content, x, y, { align: cfg.align });
    });
  }

  return {
    totalPages,
    pageWidth,
    pageHeight,
    calculatedMargin: margin,
    calculatedY: y,
  };
}
