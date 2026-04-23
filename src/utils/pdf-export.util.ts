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
};

export async function generateHtmlToPDF({
  src,
  fileName = 'generated_portable_document_format.pdf',
  configureFormat = defaultJsPDFConfig,
  configureHtmlOption = defaultHtmlOptionConfig,
}: TGenerateHtmlToPDFProps): Promise<void> {
  const html2canvas = (await import('html2canvas')).default;
  const jsPDF = (await import('jspdf')).default;
  window.html2canvas = html2canvas; // Make html2canvas globally available for jsPDF's html method, without this, jsPDF's html method fails to generate PDF correctly

  const jsPDFInstance = new jsPDF(configureFormat);
  await jsPDFInstance.html(src, {
    callback: (pdf) => {
      pdf.save(fileName);
    },
    ...configureHtmlOption,
    windowWidth: configureHtmlOption?.windowWidth ?? getWindowWidth(src), // Use original element width for calculation
  });
}
