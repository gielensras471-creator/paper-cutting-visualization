export function downloadSVG(svgElement: SVGElement, filename: string) {
  const serializer = new XMLSerializer()

  const source = serializer.serializeToString(svgElement)

  const blob = new Blob([source], {
    type: 'image/svg+xml'
  })

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.href = url

  link.download = filename

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
