import { NYC_BASEMAP_LAND, NYC_BOROUGHS, NYC_MAP_VIEWBOX } from './nycBoroughPaths'

const LABEL_PILL = {
  manhattan: { width: 92, height: 26 },
  brooklyn: { width: 78, height: 26 },
  queens: { width: 72, height: 26 },
  bronx: { width: 58, height: 26 },
  'staten-island': { width: 118, height: 26 },
}

export default function NycBoroughMap({ className = '' }) {
  return (
    <div className={`service-areas-map ${className}`}>
      <div className="service-areas-map__stage">
        <svg
          viewBox={NYC_MAP_VIEWBOX}
          role="img"
          aria-label="Map of New York City showing Manhattan, Brooklyn, Queens, the Bronx, and Staten Island"
          className="service-areas-map__svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="960" height="920" className="service-areas-map__water" rx="12" />

          <g className="service-areas-map__basemap" aria-hidden="true">
            {NYC_BASEMAP_LAND.map((path) => (
              <path
                key={`basemap-${path.slice(0, 32)}`}
                d={path}
                className="service-areas-map__land"
                fillRule="evenodd"
              />
            ))}
          </g>

          <g className="coverage-unified" aria-hidden="true">
            {NYC_BOROUGHS.flatMap((borough) =>
              borough.paths.map((path) => (
                <path
                  key={`base-${borough.id}-${path.slice(0, 24)}`}
                  d={path}
                  className="coverage-unified__shape"
                />
              )),
            )}
          </g>

          {NYC_BOROUGHS.map((borough) => {
            const pill = LABEL_PILL[borough.id] ?? { width: 80, height: 26 }

            return (
              <g
                key={borough.id}
                className={`borough borough--${borough.id}`}
                aria-label={borough.name}
              >
                {borough.paths.map((path) => (
                  <path key={path.slice(0, 32)} d={path} className="borough__hover" />
                ))}

                <foreignObject
                  x={borough.labelX - pill.width / 2}
                  y={borough.labelY - pill.height / 2}
                  width={pill.width}
                  height={pill.height}
                  className="borough__label-wrap"
                >
                  <div xmlns="http://www.w3.org/1999/xhtml" className="borough__label-pill">
                    {borough.label}
                  </div>
                </foreignObject>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
