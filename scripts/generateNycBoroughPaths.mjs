/**
 * Generates src/nycBoroughPaths.js from US Census county GeoJSON (NYC boroughs)
 * and regional county polygons for the minimal basemap.
 * Run: node scripts/generateNycBoroughPaths.mjs
 */
import fs from 'node:fs'
import https from 'node:https'

const GEOJSON_URL =
  'https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json'

const BOROUGH_IDS = {
  '36061': { id: 'manhattan', label: 'MANHATTAN', name: 'Manhattan' },
  '36047': { id: 'brooklyn', label: 'BROOKLYN', name: 'Brooklyn' },
  '36081': { id: 'queens', label: 'QUEENS', name: 'Queens' },
  '36005': { id: 'bronx', label: 'BRONX', name: 'Bronx' },
  '36085': { id: 'staten-island', label: 'STATEN ISLAND', name: 'Staten Island' },
}

const WIDTH = 960
const HEIGHT = 920
const PAD = 36

// Slightly wider than borough view for NJ shoreline and Long Island context.
const BASEMAP_LON_MIN = -74.3
const BASEMAP_LON_MAX = -73.68
const BASEMAP_LAT_MIN = 40.48
const BASEMAP_LAT_MAX = 40.92

// NYC official bounding box (approx.)
const LON_MIN = -74.255
const LON_MAX = -73.7
const LAT_MIN = 40.496
const LAT_MAX = 40.915

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (error) {
            reject(error)
          }
        })
      })
      .on('error', reject)
  })
}

function project(lon, lat) {
  const x = PAD + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (WIDTH - PAD * 2)
  const y = PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (HEIGHT - PAD * 2)
  return [x, y]
}

function ringToPath(ring, coords = 'lonlat') {
  return (
    ring
      .map((point, index) => {
        const lon = coords === 'lonlat' ? point[0] : point[1]
        const lat = coords === 'lonlat' ? point[1] : point[0]
        const [x, y] = project(lon, lat)
        return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(' ') + ' Z'
  )
}

function geometryToPaths(geometry, coords = 'lonlat') {
  if (geometry.type === 'Polygon') {
    return geometry.coordinates.map((ring) => ringToPath(ring, coords))
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.flatMap((polygon) =>
      polygon.map((ring) => ringToPath(ring, coords)),
    )
  }

  return []
}

function geometryToLandPaths(geometry, coords = 'lonlat') {
  if (geometry.type === 'Polygon') {
    const [outer, ...holes] = geometry.coordinates
    const outerPath = ringToPath(outer, coords)
    if (holes.length === 0) return [outerPath]

    const holePaths = holes.map((ring) => ringToPath(ring, coords)).join(' ')
    return [`${outerPath} ${holePaths}`]
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.flatMap((polygon) => {
      const [outer, ...holes] = polygon
      const outerPath = ringToPath(outer, coords)
      if (holes.length === 0) return [outerPath]

      const holePaths = holes.map((ring) => ringToPath(ring, coords)).join(' ')
      return [`${outerPath} ${holePaths}`]
    })
  }

  return []
}

function featureBbox(geometry, coords = 'lonlat') {
  let minLon = Infinity
  let minLat = Infinity
  let maxLon = -Infinity
  let maxLat = -Infinity

  const visit = (coordsNested) => {
    if (typeof coordsNested[0] === 'number') {
      const lon = coords === 'lonlat' ? coordsNested[0] : coordsNested[1]
      const lat = coords === 'lonlat' ? coordsNested[1] : coordsNested[0]
      minLon = Math.min(minLon, lon)
      minLat = Math.min(minLat, lat)
      maxLon = Math.max(maxLon, lon)
      maxLat = Math.max(maxLat, lat)
      return
    }

    coordsNested.forEach(visit)
  }

  visit(geometry.coordinates)
  return { minLon, minLat, maxLon, maxLat }
}

function bboxIntersects(a, b) {
  return a.minLon <= b.maxLon && a.maxLon >= b.minLon && a.minLat <= b.maxLat && a.maxLat >= b.minLat
}

function ringArea(ring, projectFn) {
  let area = 0
  for (let i = 0; i < ring.length - 1; i += 1) {
    const [x0, y0] = projectFn(ring[i][0], ring[i][1])
    const [x1, y1] = projectFn(ring[i + 1][0], ring[i + 1][1])
    area += x0 * y1 - x1 * y0
  }
  return Math.abs(area / 2)
}

function ringCentroid(ring, projectFn) {
  let x = 0
  let y = 0
  let area = 0

  for (let i = 0; i < ring.length - 1; i += 1) {
    const [x0, y0] = projectFn(ring[i][0], ring[i][1])
    const [x1, y1] = projectFn(ring[i + 1][0], ring[i + 1][1])
    const cross = x0 * y1 - x1 * y0
    area += cross
    x += (x0 + x1) * cross
    y += (y0 + y1) * cross
  }

  area *= 0.5
  if (Math.abs(area) < 1) {
    const [cx, cy] = projectFn(ring[0][0], ring[0][1])
    return [cx, cy]
  }

  return [x / (6 * area), y / (6 * area)]
}

function getMainRing(geometry) {
  if (geometry.type === 'Polygon') {
    return geometry.coordinates[0]
  }

  let largest = geometry.coordinates[0][0]
  let maxArea = ringArea(largest, project)

  geometry.coordinates.forEach((polygon) => {
    const ring = polygon[0]
    const area = ringArea(ring, project)
    if (area > maxArea) {
      maxArea = area
      largest = ring
    }
  })

  return largest
}

function pathArea(pathD) {
  const nums = pathD.match(/-?\d+\.\d+/g)?.map(Number) ?? []
  let area = 0
  for (let i = 0; i < nums.length - 2; i += 2) {
    area += nums[i] * nums[i + 3] - nums[i + 2] * nums[i + 1]
  }
  return Math.abs(area / 2)
}

function simplifyRing(ring, tolerance) {
  if (ring.length <= 4) return ring

  const sqTol = tolerance * tolerance

  function getSqDist(point, start, end) {
    let x = start[0]
    let y = start[1]
    const dx = end[0] - x
    const dy = end[1] - y

    if (dx !== 0 || dy !== 0) {
      const t = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy)
      if (t > 1) {
        x = end[0]
        y = end[1]
      } else if (t > 0) {
        x += dx * t
        y += dy * t
      }
    }

    const ox = point[0] - x
    const oy = point[1] - y
    return ox * ox + oy * oy
  }

  function simplifyStep(ring, first, last, out) {
    let maxDist = sqTol
    let index = -1

    for (let i = first + 1; i < last; i += 1) {
      const dist = getSqDist(ring[i], ring[first], ring[last])
      if (dist > maxDist) {
        index = i
        maxDist = dist
      }
    }

    if (maxDist > sqTol) {
      if (index - first > 1) simplifyStep(ring, first, index, out)
      out.push(ring[index])
      if (last - index > 1) simplifyStep(ring, index, last, out)
    }
  }

  const last = ring.length - 1
  const out = [ring[0]]
  simplifyStep(ring, 0, last, out)
  out.push(ring[last])
  return out
}

function simplifyGeometry(geometry, tolerance) {
  const next = structuredClone(geometry)

  if (next.type === 'Polygon') {
    next.coordinates = next.coordinates.map((ring) => simplifyRing(ring, tolerance))
    return next
  }

  next.coordinates = next.coordinates.map((polygon) =>
    polygon.map((ring) => simplifyRing(ring, tolerance)),
  )
  return next
}

const geojson = await fetchJson(GEOJSON_URL)

const basemapBbox = {
  minLon: BASEMAP_LON_MIN,
  minLat: BASEMAP_LAT_MIN,
  maxLon: BASEMAP_LON_MAX,
  maxLat: BASEMAP_LAT_MAX,
}

const basemapLand = geojson.features
  .filter((feature) => bboxIntersects(featureBbox(feature.geometry), basemapBbox))
  .flatMap((feature) => {
    const geometry = simplifyGeometry(feature.geometry, 0.00055)
    return geometryToLandPaths(geometry).filter((path) => pathArea(path) > 40)
  })

const boroughs = Object.entries(BOROUGH_IDS).map(([fips, meta]) => {
  const feature = geojson.features.find((entry) => entry.id === fips)
  if (!feature) throw new Error(`Missing borough feature for FIPS ${fips}`)

  const tolerance = meta.id === 'queens' ? 0.00045 : 0.00035
  const geometry = simplifyGeometry(feature.geometry, tolerance)
  const paths = geometryToPaths(geometry).filter((path) => pathArea(path) > 120)
  const mainRing = getMainRing(geometry)
  const [labelX, labelY] = ringCentroid(mainRing, project)

  return {
    ...meta,
    paths,
    labelX: Number(labelX.toFixed(2)),
    labelY: Number(labelY.toFixed(2)),
  }
})

const renderOrder = ['staten-island', 'brooklyn', 'queens', 'bronx', 'manhattan']
boroughs.sort((a, b) => renderOrder.indexOf(a.id) - renderOrder.indexOf(b.id))

const file = `export const NYC_MAP_VIEWBOX = '0 0 ${WIDTH} ${HEIGHT}'\n\nexport const NYC_BASEMAP_LAND = ${JSON.stringify(basemapLand, null, 2)}\n\nexport const NYC_BOROUGHS = ${JSON.stringify(boroughs, null, 2)}\n`

fs.writeFileSync(new URL('../src/nycBoroughPaths.js', import.meta.url), file)
console.log(
  'Generated basemap land paths:',
  basemapLand.length,
  '| borough paths:',
  boroughs.map((borough) => `${borough.id} (${borough.paths.length} paths)`).join(', '),
)
