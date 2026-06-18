import { NYC_BOROUGHS, NYC_MAP_VIEWBOX } from './nycBoroughPaths'

export default function NycBoroughMap({ className = '' }) {
  return (
    <div className={`service-areas-map ${className}`}>
      <svg
        viewBox={NYC_MAP_VIEWBOX}
        role="img"
        aria-label="Interactive map of New York City showing Manhattan, Brooklyn, Queens, the Bronx, and Staten Island"
        className="service-areas-map__svg h-auto w-full max-w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="360" height="400" className="service-areas-map__bg" rx="12" />

        {NYC_BOROUGHS.map((borough) => (
          <g
            key={borough.id}
            className={`borough borough--${borough.id}`}
            aria-label={borough.name}
          >
            {borough.paths.map((path) => (
              <g key={path.slice(0, 24)}>
                <path d={path} className="borough__base" />
                <path d={path} className="borough__highlight" />
              </g>
            ))}
            <text
              x={borough.labelX}
              y={borough.labelY}
              className="borough__label"
              style={{ fontSize: borough.labelSize }}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {borough.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
