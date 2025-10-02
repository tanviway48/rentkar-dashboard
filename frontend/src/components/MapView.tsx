// import dynamic from "next/dynamic";
// import { useState } from "react";
// import { ViewState, ViewStateChangeInfo, Marker, Source, Layer } from "react-map-gl";

// const ReactMapGL = dynamic(() => import("react-map-gl"), { ssr: false });

// interface Order {
//   _id: string;
//   pickup: { location: { coordinates: [number, number] } };
//   drop: { location: { coordinates: [number, number] } };
// }

// interface Props {
//   orders: Order[];
// }

// export default function MapView({ orders }: Props) {
//   const [viewport, setViewport] = useState<ViewState>({
//     latitude: 28.6139,
//     longitude: 77.209,
//     zoom: 5,
//     width: "100%",
//     height: "500px",
//   });

//   // Create GeoJSON lines connecting pickup → drop
//   const linesGeoJSON = {
//     type: "FeatureCollection",
//     features: orders.map((order) => ({
//       type: "Feature",
//       geometry: {
//         type: "LineString",
//         coordinates: [
//           order.pickup.location.coordinates, // [lng, lat]
//           order.drop.location.coordinates,
//         ],
//       },
//       properties: {},
//     })),
//   };

//   const lineLayer: any = {
//     id: "lines",
//     type: "line",
//     paint: {
//       "line-color": "#ff0000",
//       "line-width": 2,
//     },
//   };

//   return (
//     <ReactMapGL
//       {...viewport}
//       mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
//       onMove={(evt: ViewStateChangeInfo) => setViewport(evt.viewState)}
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//     >
//       {orders.map((order) => {
//         const [pickupLng, pickupLat] = order.pickup.location.coordinates;
//         const [dropLng, dropLat] = order.drop.location.coordinates;

//         return (
//           <div key={order._id}>
//             {/* Pickup Marker */}
//             <Marker longitude={pickupLng} latitude={pickupLat} color="green" anchor="bottom">
//               <div style={{ fontWeight: "bold" }}>P</div>
//             </Marker>

//             {/* Drop Marker */}
//             <Marker longitude={dropLng} latitude={dropLat} color="red" anchor="bottom">
//               <div style={{ fontWeight: "bold" }}>D</div>
//             </Marker>
//           </div>
//         );
//       })}

//       {/* Lines from pickup → drop */}
//       <Source id="order-lines" type="geojson" data={linesGeoJSON}>
//         <Layer {...lineLayer} />
//       </Source>
//     </ReactMapGL>
//   );
// }
