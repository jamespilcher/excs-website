'use client'

import { useEffect, useRef, useState } from "react";

import * as maptilersdk from '@maptiler/sdk'
import "@maptiler/sdk/dist/maptiler-sdk.css"

export function Map({ longitude, latitude }) {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [zoom] = useState(12);

	useEffect(() => {

		if (map.current) return; // stops map from intializing more than once
		console.log("thing")
		if (!longitude || !latitude) return;
		console.log("here")
		if (!mapContainer.current) return;
		console.log("here too")

		console.log(process.env.REACT_APP_MAP_API_KEY)
		maptilersdk.config.apiKey = null

		let region = {
			bounds:
				[[-40, 20], // Southwest coordinates
				[42.75, 63]],
			center: [-1.947754, 51.911034],
			zoom: 3.75,
		}

		map.current = new maptilersdk.Map({
			container: mapContainer.current,
			style: maptilersdk.MapStyle.STREETS,
			zoom: region.zoom,
			terrainControl: false,
			scaleControl: 'bottom-left',
			navigationControl: 'bottom-left',
			fullscreenControl: false,
			geolocateControl: false,
			center: region.center,
		})

		let el = document.createElement('div');
		el.innerHTML = `<img src="/images/map-point.svg" class="pb-4 object-fit h-12 w-12" alt="point"/>`;

		// add marker to map
		new maptilersdk.Marker({ element: el })
			.setLngLat({ lon: longitude, lat: latitude })
			.on('click', () => console.log("open"))
			.addTo(map.current);

	}, [zoom, latitude, longitude]);


	return mapContainer ? (
		<div className="relative w-full h-full">
			<div ref={mapContainer} className="absolute w-full h-full" />
		</div>
	) : (
		<div>
			<h1 className="text-white text-xl font-bold">Map not available</h1>
		</div>
	)
}