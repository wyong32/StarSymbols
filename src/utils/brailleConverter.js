// Braille converter utilities - adapted from Image-to-Braille-master

export function createImageCanvas(src, width) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('CANVAS')
    const image = new Image()

    image.onload = () => {
      // Calculate proper dimensions maintaining aspect ratio
      const aspectRatio = image.height / image.width
      let canvasWidth = width * 2 // Braille characters are 2 pixels wide
      let canvasHeight = Math.round(canvasWidth * aspectRatio)

      // Increase minimum height to make result taller
      canvasHeight = Math.max(canvasHeight, Math.round(width * 1.2)) // Increased minimum height

      // If the calculated height is too small compared to width, increase it
      if (canvasHeight < canvasWidth * 0.6) {
        canvasHeight = Math.round(canvasWidth * 0.8) // Make it at least 80% of width
      }

      // Nearest multiple for braille (2x4 pixel blocks)
      canvas.width = canvasWidth - (canvasWidth % 2)
      canvas.height = canvasHeight - (canvasHeight % 4)

      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#FFFFFF' // Get rid of alpha
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Disable image smoothing for pixel-perfect rendering
      ctx.mozImageSmoothingEnabled = false
      ctx.webkitImageSmoothingEnabled = false
      ctx.msImageSmoothingEnabled = false
      ctx.imageSmoothingEnabled = false

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(canvas)
    }

    image.onerror = reject
    image.src = src
  })
}

export function pixelsToCharacter(pixels_lo_hi, monospace = false) {
  // Codepoint reference - https://www.ssec.wisc.edu/~tomw/java/unicode.html#x2800
  const shift_values = [0, 1, 2, 6, 3, 4, 5, 7] // Correspond to dots in braille chars
  let codepoint_offset = 0

  for (const i in pixels_lo_hi) {
    codepoint_offset += +pixels_lo_hi[i] << shift_values[i]
  }

  if (codepoint_offset === 0 && monospace === false) {
    // Pixels were all blank - use single dot instead of completely blank
    codepoint_offset = 4 // 0x2800 is blank braille char, 0x2804 is single dot
  }

  return String.fromCharCode(0x2800 + codepoint_offset)
}

export function toGreyscale(r, g, b, mode = 'luminance') {
  switch (mode) {
    case 'luminance':
      return 0.22 * r + 0.72 * g + 0.06 * b
    case 'lightness':
      return (Math.max(r, g, b) + Math.min(r, g, b)) / 2
    case 'average':
      return (r + g + b) / 3
    case 'value':
      return Math.max(r, g, b)
    default:
      console.error('Greyscale mode is not valid')
      return 0
  }
}

export function canvasToText(canvas, settings = {}) {
  const {
    grayscaleMode = 'luminance',
    inverted = false,
    dithering = false,
    monospace = false,
  } = settings

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  let image_data = []

  if (dithering) {
    // Apply dithering if enabled
    image_data = applyDithering(canvas)
  } else {
    image_data = new Uint8Array(ctx.getImageData(0, 0, width, height).data.buffer)
  }

  let output = ''

  // Process in 2x4 pixel blocks for braille characters
  for (let imgy = 0; imgy < height; imgy += 4) {
    for (let imgx = 0; imgx < width; imgx += 2) {
      const braille_info = [0, 0, 0, 0, 0, 0, 0, 0]
      let dot_index = 0

      for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 4; y++) {
          const index = (imgx + x + width * (imgy + y)) * 4
          const pixel_data = image_data.slice(index, index + 4)

          if (pixel_data[3] >= 128) {
            // Account for alpha
            const grey = toGreyscale(pixel_data[0], pixel_data[1], pixel_data[2], grayscaleMode)

            if (inverted) {
              if (grey >= 128) braille_info[dot_index] = 1
            } else {
              if (grey <= 128) braille_info[dot_index] = 1
            }
          }
          dot_index++
        }
      }
      output += pixelsToCharacter(braille_info, monospace)
    }
    output += '\n'
  }

  return output
}

// Floyd-Steinberg dithering implementation
export function applyDithering(canvas) {
  const ctx = canvas.getContext('2d')
  const imageData = new Uint8Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data)

  const _getPixel = (x, y) => {
    const index = (x + y * canvas.width) * 4
    return [imageData[index + 0], imageData[index + 1], imageData[index + 2]]
  }

  const _setPixel = (x, y, colour) => {
    const index = (x + y * canvas.width) * 4
    imageData[index + 0] = Math.floor(colour[0] + 0.5)
    imageData[index + 1] = Math.floor(colour[1] + 0.5)
    imageData[index + 2] = Math.floor(colour[2] + 0.5)
    imageData[index + 3] = 255
  }

  const _closestPaletteColour = (pixel) => {
    return 0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2] > 128
      ? [255, 255, 255]
      : [0, 0, 0]
  }

  const _colourDifference = (one, two) => {
    return [one[0] - two[0], one[1] - two[1], one[2] - two[2]]
  }

  const _colourAddError = (x, y, err_red, err_green, err_blue) => {
    const clip = (x) => (x < 0 ? 0 : x > 255 ? 255 : x)
    const index = (x + y * canvas.width) * 4
    imageData[index + 0] = clip(imageData[index + 0] + err_red)
    imageData[index + 1] = clip(imageData[index + 1] + err_green)
    imageData[index + 2] = clip(imageData[index + 2] + err_blue)
    imageData[index + 3] = 255
  }

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const oldpixel = _getPixel(x, y)
      const newpixel = _closestPaletteColour(oldpixel)
      _setPixel(x, y, newpixel)
      const quant_error = _colourDifference(oldpixel, newpixel)

      const err_red = quant_error[0]
      const err_green = quant_error[1]
      const err_blue = quant_error[2]

      if (x + 1 < canvas.width)
        _colourAddError(x + 1, y, (7 / 16) * err_red, (7 / 16) * err_green, (7 / 16) * err_blue)
      if (x - 1 > 0 && y + 1 < canvas.height)
        _colourAddError(x - 1, y + 1, (3 / 16) * err_red, (3 / 16) * err_green, (3 / 16) * err_blue)
      if (y + 1 < canvas.height)
        _colourAddError(x, y + 1, (5 / 16) * err_red, (5 / 16) * err_green, (5 / 16) * err_blue)
      if (x + 1 < canvas.width && y + 1 < canvas.height)
        _colourAddError(x + 1, y + 1, (1 / 16) * err_red, (1 / 16) * err_green, (1 / 16) * err_blue)
    }
  }

  return imageData
}
